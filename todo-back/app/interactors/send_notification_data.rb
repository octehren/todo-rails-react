class SendNotificationData
    include Interactor

    def call
        todo = context.todo
        if context.changed_status
            context.notification_data = { todo: todo, event: todo.event }
        else
            context.notification_data = { todo: todo }
        end
    end
end