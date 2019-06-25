class CreateToDos < ActiveRecord::Migration[5.2]
  def change
    create_table :to_dos do |t|
      t.string :title, null: false, default: ""
      t.text :description
      t.integer :status, null: false, default: 0
      t.timestamps
    end
  end
end
