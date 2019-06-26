class ToDosController < ApplicationController
    def index
        todos = ToDo.order('created_at DESC')
        render json: todos
    end

    def create
        result = CreateToDo.call(todo_params: todo_params)
        if result.success?
            render json: result.todo
        else
            render json: result.errors
        end
    end

    def update
        result = UpdateToDo.call(id: params[:id], todo_params: todo_params)
        if result.success?
            another_result = SendNotificationData.call(todo: result.todo, changed_status: result.changed_status)
            render json: another_result.notification_data
        else
            render json: result.errors
        end
    end

    def destroy
        result = DestroyToDo(params[:id])
        if result.success?
            head(:no_content, status: :ok)
        else
            render json: result.errors
        end
    end

    private

    def todo_params
        params.require(:todo).permit(:title, :description, :username, :status)
    end
end
