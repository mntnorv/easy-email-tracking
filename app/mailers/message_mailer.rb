class MessageMailer < ActionMailer::Base
  def message_email (message)
    @message = message
    @message.message_state = MessageState.find_by name: 'Sent'
    @message.save
    
    mail(
      to: message.recipient_list,
      from: message.user.email,
      subject: message.subject
    )
  end
end
