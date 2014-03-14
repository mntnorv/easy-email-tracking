require 'resque/tasks'
require 'resque_scheduler/tasks'

task "resque:setup" => :environment do
  if ENV["REDISCLOUD_URL"]
    uri = URI.parse(ENV["REDISCLOUD_URL"])
    Resque.redis = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
  end
  
  Resque.schedule = YAML.load_file('config/schedule.yml')
end
