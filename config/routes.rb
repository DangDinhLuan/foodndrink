Rails.application.routes.draw do
  root "home#index"
  get "/signup", to: "users#new"
  post "/signup", to: "users#create"
  get "/login", to: "sessions#new"
  post "/login", to: "sessions#create"
  resources :users
  resources :account_activations, only: [:edit]
  resources :password_resets, expect: :destroy
  resources :carts, only: [:create, :update, :destroy]
  resources :products

  namespace :admin do
    resources :categories
    resources :orders, except: [:destroy]
    resources :comments, except: [:edit, :update]
    resources :users
    resources :products
    resources :slides, except: [:index, :show]
    get "slides", to: "slides#new"
    post "slides/updates", to: "slides#update_status"
    resources :suggestions, except: [:new]
    get "suggestions/:id/examine", to: "suggestions#examine"
    post "suggestions/accept", to: "suggestions#accept"
  end
end
