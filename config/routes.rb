Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'uploads' => 'upload#index'
  get 'upload/new' => 'upload#new'
  post 'uploads' => 'upload#create'
  root 'upload#index'
end
