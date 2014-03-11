class FetchAnalytics
  @queue = :analytics
  
  def self.perform
    sleep(5)
  end
end