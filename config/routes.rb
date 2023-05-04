Rails.application.routes.draw do
  
  resources :user_interests
  resources :user_activities
  resources :users
  resources :activities
  # Routing logic: fallback requests for React Router.
  post '/signup', to: 'users#create'
  get '/me', to: 'users#login'
  patch '/me', to: 'users#update'
  post "/login", to: "sessions#create"
  delete '/logout', to: 'sessions#destroy'
  # patch '/user/activities/:id', to: 'activities#update'







  get 'favicon.ico', to: redirect('/assets/favicon.ico')


  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
