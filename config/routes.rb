Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  
  root 'home#index'
  
  devise_for :users
  
  # Dashboard
  get '/dashboard', to: 'dashboard#index', as: 'dashboard'
  
  # API
  scope '/api' do
    
    # Messages
    get  '/messages/:id',            to: 'messages#get',    as: 'get_message',    constraints: { id: /\d+/ }
    put  '/messages/:id',            to: 'messages#update', as: 'update_message', constraints: { id: /\d+/ }
    put  '/messages/:id/send',       to: 'messages#send',   as: 'send_message',   constraints: { id: /\d+/ }
    get  '/messages/:limit/:offset', to: 'messages#list',   as: 'list_messages'
    post '/messages',                to: 'messages#new',    as: 'new_message'
    
  end
end
