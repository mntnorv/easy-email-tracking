class Message < ActiveRecord::Base
  has_many :recipients
  belongs_to :user
  belongs_to :message_state
  
  validates :body, presence: true
  validates_associated :recipients
  validates_presence_of :recipients
  
  after_initialize :add_state
  
  def recipient_list
    self.recipients.map { |t|
      if (t.name != nil)
        "#{t.name} <#{t.email}>"
      else
        t.email
      end
    }.join(", ")
  end
  
  def recipient_list=(new_value)
    if self.recipients.length > 0
      Recipient.delete_all(["message_id = ?", self.id])
    end
    
    recipient_names = new_value.split(/,\s+/)
    recipient_names.each do |name|
      parts = name.split(/\s*[<>]/)
      name = nil
      email = nil
      
      if (parts.length > 1)
        name = parts[0]
        email = parts[1]
      else
        email = parts[0]
      end
      
      self.recipients << Recipient.new(
        name:  name,
        email: email
      )
    end
  end
  
  def add_state
    self.message_state ||= MessageState.find_by name: 'Draft'
  end
  
  def as_json(options)
    super(:only => [:subject, :body, :message_state, :updated_at, :sent_at], :methods => [:recipient_list])
  end
end
