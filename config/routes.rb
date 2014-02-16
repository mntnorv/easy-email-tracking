Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  
  root 'home#index'
  
  devise_for :users
  
  # Messages
  post '/message/send', to: 'messages#send', as: 'send_message'
end
