Rails.application.routes.draw do
  get 'homepage/index'
  root 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, except: [:index, :edit, :update, :destroy]
  # resources :sessions, except: [:index, :edit, :update, :destroy]
  post '/sessions' => "sessions#create"
  delete '/sessions' => "sessions#destroy"
  get '/contract/store' => "contract#store"
  get '/contract' => "contract#index"
  get '/register' => "users#new"
  get '/keys' => "users#keys"
  post '/keys' => "users#insert_publickey"
  get '/sessions/login' => "sessions#new"
  get '/contract/config' => "contract#config"
  get '/loggedin' => "homepage#loggedin"
  get '/setupblock' => "users#newblock"
end
