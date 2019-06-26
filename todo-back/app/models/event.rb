class Event < ApplicationRecord
    belongs_to :to_do

    enum kind: [:congratulations, :shame]
    after_initialize :generate_color_and_message

    def get_todo_username
        self.to_do.username
    end

    def get_todo_title
        self.to_do.title
    end

    def get_todo_status
        self.to_do.status
    end

    def generate_color_and_message
        colors = [
            "#7B68EE", 
            "#6A5ACD", 
            "#800000", 
            "#2F4F4F"
        ]
        self.color = colors.sample

        self.get_todo_status == "done" ? self.register_congratulations : self.register_shame

        self.save!
    end

    def register_congratulations
        messages = [
            "Daora po",
            "Aeeee kkkkkjjj",
            "Tip topperson!!!",
            "#sextou",
            "=)"
        ]
        self.message = messages.sample
        self.kind = :congratulations
    end

    def register_shame
        messages = [
            "Affff...",
            "Pooo bixo...",
            "Vish...",
            "Puuuutzzz...",
            "=("
        ]
        self.message = messages.sample
        self.kind = :shame
    end
end
