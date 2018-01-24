Rails.application.routes.draw do
  root "home#index"
  get "/signup", to: "users#new"
  post "/signup", to: "users#create"
  resources :users
end
