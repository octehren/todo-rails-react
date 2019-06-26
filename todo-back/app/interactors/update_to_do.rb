class UpdateToDo
    include Interactor

    def call
        todo = ToDo.find(context.id)
        status1 = todo.status
        if todo.update_attributes(context.todo_params)
            context.todo = todo
            context.changed_status = status1 != todo.status
        else
            context.fail!(errors: todo.errors)
        end
    end
end