class ToDo < ApplicationRecord
=begin
### Fields: 
    string :title, null: false, default: ""
    text :description
    integer :status, null: false, default: 0
=end
    has_one :event, dependent: :destroy
    enum status: [:unfinished, :done, :undone]
    after_save :register_event

    def has_event?
        return !self.event.nil?
    end

    def has_same_kind_as_registered_event?
        t = self.status
        e = self.event.kind
        return (t == "done" && e == "congratulations") || (t == "undone" && e == "shame")
    end

    def register_event
        if self.has_event? && has_same_kind_as_registered_event?
            self.event.destroy
        end
        if self.status != "unfinished"
            self.event = Event.new(to_do_id: self.id)
        end
    end

    
end
