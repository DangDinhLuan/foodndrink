Rails.application.routes.draw do
  root "home#index"
  get "/signup", to: "users#new"
  post "/signup", to: "users#create"
  get "/login", to: "sessions#new"
  post "/login", to: "sessions#create"
  resources :users
  resources :account_activations, only: [:edit]
  resources :password_resets, expect: :destroy  
end
