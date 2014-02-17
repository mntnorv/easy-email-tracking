class MessagesController < ApplicationController
  before_filter :authenticate_user!
  
  def new
    @message = Message.new(message_params)
    
    if @message.save
      render json: {:success => 'MESSAGE_SAVED'}
    else
      render json: {:error => 'INVALID_MESSAGE'}
    end
  end
  
  private

  def message_params
    params.require(:message).permit(:recipient_list, :subject, :body)
  end
end