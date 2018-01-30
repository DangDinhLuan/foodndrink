Rails.application.routes.draw do
  root "home#index"
  get "/signup", to: "users#new"
  post "/signup", to: "users#create"
  get "/login", to: "sessions#new"
  post "/login", to: "sessions#create"
  get "/logout", to: "sessions#destroy"
  resources :users, except: :index
  get "/user/profiles", to: "users#show"
  get "/user/orders", to: "users#order"
  resources :account_activations, only: :edit
  resources :password_resets, expect: :destroy
  resources :carts, only: [:create, :update, :destroy]
  resources :products
  resources :categories

  namespace :admin do
    resources :categories
    resources :orders, except: :destroy
    resources :comments, except: [:edit, :update]
    resources :users
    resources :products
    resources :slides, except: [:index, :show]
    get "slides", to: "slides#new"
    post "slides/updates", to: "slides#update_status"
    resources :suggestions, except: :new
    get "suggestions/:id/examine", to: "suggestions#examine"
    post "suggestions/accept", to: "suggestions#accept"
  end
end
