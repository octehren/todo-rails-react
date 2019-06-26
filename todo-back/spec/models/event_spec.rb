require 'rails_helper'

RSpec.describe Event, type: :model do
  describe "Proper event generation after to-do update:" do
    before(:each) do
      @todo = build(:to_do)
    end

    it "to-do generates 'congratulations' event type after being saved with 'done' status" do
      @todo.update_attributes(status: :done)
      expect(@todo.event.kind.to_sym).to eq :congratulations
    end

    it "'congratulations' event type has a success message" do
      @todo.update_attributes(status: :done)
      success_messages = [
            "Daora po",
            "Aeeee kkkkkjjj",
            "Tip topperson!!!",
            "#sextou",
            "=)"
        ]
      expect(success_messages.include? @todo.event.message).to eq true
    end

    it "to-do generates 'shame' event type after being saved with 'undone' status" do
      @todo.update_attributes(status: :undone)
      expect(@todo.event.kind.to_sym).to eq :shame
    end

    it "deletes past event once new status is assigned" do
      @todo.update_attributes(status: :done)
      expect(Event.all.size).to eq 1
      @todo.update_attributes(status: :undone)
      expect(Event.all.size).to eq 1
    end

    it "'shame' event type has a failure message" do
      @todo.update_attributes(status: :undone)
      failure_messages = [
            "Affff...",
            "Pooo bixo...",
            "Vish...",
            "Puuuutzzz...",
            "=("
        ]
      expect(failure_messages.include? @todo.event.message).to eq true
    end
  end
end
