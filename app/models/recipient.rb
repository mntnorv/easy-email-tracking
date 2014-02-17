class Recipient < ActiveRecord::Base
  belongs_to :message
  
  validates :email, format: { with: /\S+@\S+\.\S+/,
    message: "must be a valid email" }
end
