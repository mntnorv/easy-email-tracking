require 'resque/tasks'
require 'resque_scheduler/tasks'

task "resque:setup" => :environment do
  if ENV["REDISCLOUD_URL"]
    Resque.redis = URI.parse(ENV["REDISCLOUD_URL"])
  end
end
