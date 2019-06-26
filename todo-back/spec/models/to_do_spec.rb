require 'rails_helper'

RSpec.describe ToDo, type: :model do
  describe "Checks correct model initialization & registration:" do
    before(:each) do
      @todo = build(:to_do)
    end

    it "initializes with 'unfinished' status" do
      expect(@todo.status.to_sym).to eq :unfinished
    end

  end
end
