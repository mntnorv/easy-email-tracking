class MessagesController < ApplicationController
  before_filter :authenticate_user!
  
  def send
  end
end