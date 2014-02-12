Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  
  root 'home#index'
  
  devise_for :users, :controllers => {sessions: 'sessions'}
end
