Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  
  root 'home#index'
  
  devise_for :users
  
  # Dashboard
  get '/dashboard', to: 'dashboard#index', as: 'dashboard'
  
  # Messages
  post '/messages', to: 'messages#new', as: 'new_message'
end
