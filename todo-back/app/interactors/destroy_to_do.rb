class DestroyToDo
    include Interactor

    def call
        todo = ToDo.find(context.id)
        if !todo.destroy
            context.fail!(errors: todo.errors)
        end
    end
end