class UpdateToDo
    include Interactor

    def call
        todo = ToDo.find(context.id)
        if todo.update_attributes(context.todo_params)
            context.todo = todo
            context.changed_status = todo.status_changed?
        else
            context.fail!(errors: todo.errors)
        end
    end
end