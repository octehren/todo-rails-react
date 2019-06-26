class ToDosController < ApplicationController
    def index
        todos = ToDo.all
        render json: todos
    end

    def create

    end

    def update

    end

    def destroy
        
    end
end
