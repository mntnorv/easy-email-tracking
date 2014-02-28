class MessageMailer < ActionMailer::Base
  def message_email (message)
    @message = message
    
    mail(
      to: message.recipients,
      from: message.user.email,
      subject: message.subject
    )
  end
end
