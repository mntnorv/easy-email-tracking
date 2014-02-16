Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  
  root 'home#index'
  
  devise_for :users
  
  # Messages
  get  '/message/compose', to: 'messages#compose', as: 'new_message'
  post '/message/compose', to: 'messages#send',    as: 'send_message'
end
