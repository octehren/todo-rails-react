Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', to: "to_dos#index"
  post '/', to: "to_dos#create"
  put '/:id', to: "to_dos#update"
  delete '/:id', to: "to_dos#destroy"
end
