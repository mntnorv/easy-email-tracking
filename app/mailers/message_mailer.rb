require 'uri'

class MessageMailer < ActionMailer::Base
  def message_email (message)
    @message = message
    
    tracking_id  = "UA-48184059-1"
    message_id   = message.id
    
    @tracking_url = "http://www.google-analytics.com/collect?v=1&tid=#{tracking_id}&cid=#{message_id}&t=event&ec=email&ea=open&el=#{message_id}&cs=newsletter&cm=email&cn=EasyTrack&cm1=1"
    @tracking_url = URI.escape(@tracking_url)
    
    mail(
      to: message.recipients,
      from: message.user.email,
      subject: message.subject
    )
  end
end
