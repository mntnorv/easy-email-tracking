class Message < ActiveRecord::Base
  has_many :recipients
end
