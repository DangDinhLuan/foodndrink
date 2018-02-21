Rails.application.routes.draw do
  root "home#index"
  get "/signup", to: "users#new"
  post "/signup", to: "users#create"
  get "/login", to: "sessions#new"
  post "/login", to: "sessions#create"
  get "/logout", to: "sessions#destroy"
<<<<<<< HEAD
<<<<<<< HEAD
  get "/user/orders", to: "orders#show"
=======
>>>>>>> 59e9162bf674120c64041e0bddbebf28f48f56c4
=======
>>>>>>> edcd4c2... Send mail to custommer
  get "user/profiles", to: "users#show"
  patch "user/change_password", to: "users#change_password"
  resources :users, except: [:index, :show, :destroy]
  resources :orders, except: [:edit, :update, :destroy]
<<<<<<< HEAD
  resources :account_activations, only: [:edit]
<<<<<<< 7f292043bdf931c85e02c19fcea7d88effab9f59
=======
  get "/user/orders", to: "orders#index"
>>>>>>> 59e9162bf674120c64041e0bddbebf28f48f56c4
=======
  get "/user/orders", to: "orders#index"
>>>>>>> Admin filter order
  get "/checkout", to: "orders#new"
  resources :account_activations, only: :edit
  resources :password_resets, expect: :destroy
  resources :carts, only: [:create, :destroy]
  post "/carts/update", to: "carts#update"
  get "/cart/details", to: "carts#show"
  resources :suggestions
  resources :categories, only: :show
  resources :products, only: :show
  post "/search", to: "products#search"
  resources :comments, only: [:create, :destroy]
  post "/ratings", to: "ratings#create"
  patch "/ratings", to: "ratings#update"

  get "/admin", to: "admin/dashboards#index"
<<<<<<< 7f292043bdf931c85e02c19fcea7d88effab9f59
=======
  get "/export", to: "admin#index"
>>>>>>> Admin filter order
  namespace :admin do
    resources :categories
    resources :orders, except: :destroy
    resources :comments, except: [:edit, :update]
    resources :users
<<<<<<< 7f292043bdf931c85e02c19fcea7d88effab9f59
<<<<<<< HEAD
    resources :products
=======
    resources :products do
      collection { post :import }
    end
>>>>>>> 59e9162bf674120c64041e0bddbebf28f48f56c4
=======
    resources :products do
      collection { post :import }
    end
>>>>>>> Admin filter order
    resources :slides, except: [:index, :show]
    get "slides", to: "slides#new"
    post "slides/updates", to: "slides#update_status"
    resources :suggestions, except: :new
    get "suggestions/:id/examine", to: "suggestions#examine"
    post "suggestions/accept", to: "suggestions#accept"
  end
end
