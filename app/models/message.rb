class Message < ActiveRecord::Base
  has_many :recipients
  
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
    recipient_names = new_value.split(/,\s+/)
    self.recipients = recipient_names.map { |name|
      parts = name.split(/\s*[<>]/)
      name = nil
      email = nil
      
      if (parts.length > 1)
        name = parts[0]
        email = parts[1]
      else
        email = parts[0]
      end
      
      if (!self.recipients.exists?(:conditions => ['email = ?', email]))
        self.recipients << Recipient.new(
          name:  name,
          email: email
        )
      end
    }
  end
end
