require 'google/api_client'
require 'date'
require 'resque'

class FetchAnalytics
  @queue = :analytics
  
  def self.perform
    result = self.fetch
    open_counts = self.parse(result)
    self.update_db(open_counts)
  rescue Resque::TermException
    Resque.enqueue(self)
  end
  
  def self.fetch
    api_version     = "v3"
    cached_api_file = "tmp/cache/analytics-#{api_version}.cache"
    
    client = Google::APIClient.new(
      :application_name    => 'EasyTrack',
      :application_version => '1.0.0')
    
    key = OpenSSL::PKey::RSA.new(ENV["GOOGLE_PRIVATE_KEY"], 'notasecret')
    client.authorization = Signet::OAuth2::Client.new(
      :token_credential_uri => 'https://accounts.google.com/o/oauth2/token',
      :audience             => 'https://accounts.google.com/o/oauth2/token',
      :scope                => 'https://www.googleapis.com/auth/analytics.readonly',
      :issuer               => ENV["GOOGLE_SERVICE_EMAIL"],
      :signing_key          => key)
    
    client.authorization.fetch_access_token!

    analytics = nil
    # Load cached discovered API, if it exists. This prevents retrieving the
    # discovery document on every run, saving a round-trip to the discovery service.
    if File.exists? cached_api_file
      File.open(cached_api_file) do |file|
        analytics = Marshal.load(file)
      end
    else
      analytics = client.discovered_api('analytics', api_version)
      File.open(cached_api_file, 'w') do |file|
        Marshal.dump(analytics, file)
      end
    end
    
    start_date = DateTime.now.prev_month.strftime("%Y-%m-%d")
    end_date   = DateTime.now.strftime("%Y-%m-%d")
    
    result = client.execute(:api_method => analytics.data.ga.get, :parameters => {
      'ids'        => "ga:" + ENV["ANALYTICS_PROFILE_ID"],
      'start-date' => start_date,
      'end-date'   => end_date,
      'dimensions' => "ga:eventLabel",
      'metrics'    => "ga:metric1",
      'sort'       => "ga:eventLabel"
    })
  end
  
  def self.parse(result)
    columns = {}
    open_counts = []
    
    result.data.column_headers.each_with_index do |header, index|
      columns[header.name] = index
    end
    
    result.data.rows.each do |row|
      id = row[columns['ga:eventLabel']]
      count = row[columns['ga:metric1']]
      open_counts << {
        :id    => id,
        :count => count
      }
    end
    
    return open_counts
  end
  
  def self.update_db(open_counts)
    Message.transaction do
      open_counts.each do |row|
        Message.where(:id => row[:id]).update_all(:open_count => row[:count])
      end
    end
  end
end