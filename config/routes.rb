Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  root 'home#index'

  get 'learn_more' => 'home#learn_more'
  get 'details' => 'home#details'
end
