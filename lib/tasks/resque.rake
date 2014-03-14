require 'resque/tasks'
require 'resque_scheduler/tasks'

task "resque:setup" => :environment do
  Resque.schedule = YAML.load_file('config/schedule.yml')
end
