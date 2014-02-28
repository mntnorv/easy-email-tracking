class MessagesController < ApplicationController
  before_filter :authenticate_user!
  
  def new
    @message = Message.new(message_params)
    @message.user = current_user
    
    if @message.save
      render json: {
        :success => 'MESSAGE_SAVED',
        :message => @message
      }
    else
      render json: {
        :error => 'INVALID_MESSAGE',
        :model_errors => @message.errors
      }, status: :bad_request
    end
  end
  
  def update
    @message = current_user.messages.find_by_id(params[:id])
    
    if @message
      @message.update_attributes(message_params)
      
      if @message.save
        if params[:send] == 'true'
          MessageMailer.message_email(@message).deliver
        end
        
        render json: {
          :success => 'MESSAGE_SAVED',
          :message => @message
        }
      else
        render json: {
          :error => 'INVALID_MESSAGE',
          :model_errors => @message.errors
        }, status: :bad_request
      end
    else
      render json: {
        :error => 'NO_SUCH_MESSAGE'
      }, status: :not_found
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
      }, status: :not_found
    end
  end
  
  def list
    limit  = params[:limit]
    offset = params[:offset]
    
    @messages = current_user.messages
      .limit(limit)
      .offset(offset)
      .order(created_at: :desc)
      .includes(:message_state)
    
    render json: {
      :messages => @messages,
      :count    => current_user.messages.count
    }
  end
  
  private

  def message_params
    params.require(:message).permit(:recipients, :subject, :body)
  end
end