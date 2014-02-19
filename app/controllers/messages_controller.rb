class MessagesController < ApplicationController
  before_filter :authenticate_user!
  
  def new
    @message = Message.new(message_params)
    @message.user = current_user
    
    if @message.save
      render json: {:success => 'MESSAGE_SAVED'}
    else
      render json: {
        :error => 'INVALID_MESSAGE',
        :model_errors => @message.errors
      }, status: :bad_request
    end
  end
  
  def get
    @message = current_user.messages.find_by_id(params[:id])
    
    if (@message)
      render json: {
        :message => @message
      }
    else
      render json: {
        :error => 'NO_SUCH_MESSAGE'
      }, status: :bad_request
    end
  end
  
  private

  def message_params
    params.require(:message).permit(:recipient_list, :subject, :body)
  end
end