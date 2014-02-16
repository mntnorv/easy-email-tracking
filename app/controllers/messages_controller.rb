class MessagesController < ApplicationController
  before_filter :authenticate_user!
  
  def compose
    @message = Message.new
  end
end