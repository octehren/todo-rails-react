class ToDosController < ApplicationController
    def index
        todos = ToDo.order('created_at DESC')
        render json: todos
    end

    def create

    end

    def update

    end

    def destroy

    end

    private

    def todo_params

    end
end
