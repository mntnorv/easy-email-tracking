class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :message_state
  
  validates :body, presence: true
  validates :recipients, format: {
    with: /\A((\s*([\w\.]+@[\w\.]+|(\p{L}+\s*)+<[\w\.]+@[\w\.]+>)),)*(\s*([\w\.]+@[\w\.]+|(\p{L}+\s*)+<[\w\.]+@[\w\.]+>))\z/
  }
  
  after_initialize :add_state
  
  def deliver
    MessageMailer.message_email(self).deliver
    self.sent_at       = DateTime.now
    self.message_state = MessageState.find_by name: 'Sent'
    self.save
  end
  
  def message_state_name
    self.message_state.name
  end
  
  def add_state
    self.message_state ||= MessageState.find_by name: 'Draft'
  end
  
  def as_json(options)
    super(:methods => [:message_state_name])
  end
end
