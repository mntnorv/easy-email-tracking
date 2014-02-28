class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :message_state
  
  validates :body, presence: true
  # validates :recipients, format: { with: /\A((\s*([\w\.]+@[\w\.]+|(\w+\s*)+<[\w\.]+@[\w\.]+>)),?)+\z/ }
  
  after_initialize :add_state
  
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
