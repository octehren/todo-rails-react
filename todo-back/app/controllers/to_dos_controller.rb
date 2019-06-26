class ToDosController < ApplicationController
    def index
        todos = ToDo.order('created_at DESC')
        render json: todos
    end

    def create
        todo = ToDo.create(todo_params)
        render json: todo
    end

    def update
        todo = ToDo.find(params[:id])
        todo.update_attributes(todo_params)
        render json: todo
    end

    def destroy
        todo = ToDo.find(params[:id])
        if todo.destroy
            head(:no_content, status: :ok)
        else
            render json: todo.errors
        end
    end

    private

    def todo_params
        params.require(:todo).permit(:title, :description, :username, :status)
    end
end
