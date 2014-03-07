require 'uri'

class MessageMailer < ActionMailer::Base
  def message_email (message)
    @message = message
    
    tracking_id  = "UA-48184059-1"
    client_id    = message.user.id
    recipient_id = 1
    
    @tracking_url = "http://www.google-analytics.com/collect?v=1&tid=#{tracking_id}&cid=#{client_id}&t=event&ec=email&ea=open&el=#{recipient_id}&cs=newsletter&cm=email&cn=EasyTrack"
    @tracking_url = URI.escape(@tracking_url)
    
    mail(
      to: message.recipients,
      from: message.user.email,
      subject: message.subject
    )
  end
end
