class ToDo < ApplicationRecord
    enum status: [:unfinished, :done, :undone]
end
