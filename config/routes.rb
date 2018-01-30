Rails.application.routes.draw do
  root "home#index"
  get "/signup", to: "users#new"
  post "/signup", to: "users#create"
  get "/login", to: "sessions#new"
  post "/login", to: "sessions#create"
  get "/logout", to: "sessions#destroy"
  get "/user/orders", to: "users#order"
  get "user/profiles", to: "users#show"
  patch "user/change_password", to: "users#change_password"
  resources :users, except: [:index, :show, :destroy]
  resources :orders, except: [:edit, :update, :destroy]
  resources :account_activations, only: [:edit]
  resources :password_resets, expect: :destroy
  resources :carts, only: [:create, :destroy]
  post "carts/update", to: "carts#update"
  resources :products
  resources :suggestions
  resources :categories

  get "/admin", to: "admin/products#index"
  namespace :admin do
    resources :categories
    resources :orders, except: :destroy
    resources :comments, except: [:edit, :update]
    resources :users, except: [:show]
    resources :products
    resources :slides, except: [:index, :show]
    get "slides", to: "slides#new"
    post "slides/updates", to: "slides#update_status"
    resources :suggestions, except: :new
    get "suggestions/:id/examine", to: "suggestions#examine"
    post "suggestions/accept", to: "suggestions#accept"
  end
end
