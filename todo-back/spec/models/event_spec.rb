require 'rails_helper'

RSpec.describe Event, type: :model do
  describe "Proper event generation after to-do update:" do
    before(:all) do
      @todo = build(:to_do)
    end

    it "to-do generates 'congratulations' event type after being saved with 'done' status" do
      @todo.status = :done
      @todo.save
      expect(@todo.event.kind.to_sym).to eq :congratulations
    end

    it "'congratulations' event type has a success message" do
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
      @todo.status = :undone
      @todo.save
      expect(@todo.event.kind.to_sym).to eq :shame
    end

    it "deletes past event once new status is assigned" do
      @todo.status = :done
      @todo.save
      expect(Event.all.size).to eq 1
      @todo.status = :undone
      @todo.save
      expect(Event.all.size).to eq 1
    end

    it "'shame' event type has a failure message" do
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
