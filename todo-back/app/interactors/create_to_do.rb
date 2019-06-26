class CreateToDo
    include Interactor

    def call
        todo = ToDo.new(context.todo_params)
        if todo.save
            context.todo = todo
        else
            context.fail!(errors: todo.errors)
        end
    end
end