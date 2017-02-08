Rails.application.routes.draw do
  get 'homepage/index'
  root 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, except: [:index, :edit, :update, :destroy]
  resources :sessions, except: [:index, :edit, :update, :destroy]
  post '/sessions' => "sessions#create"
  delete '/sessions' => "sessions#destroy"
  get '/contract/new' => "contract#index"
  get '/sessions/login' => "sessions#new"
  get '/contract/config' => "contract#config"
end
