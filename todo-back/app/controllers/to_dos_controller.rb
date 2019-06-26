class ToDosController < ApplicationController
    def index
        todos = ToDo.all
        render json: todos
    end
end
