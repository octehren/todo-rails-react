class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.integer :kind
      t.string :message
      t.string :color
      t.belongs_to :to_do, index: true, foreign_key: true
      t.timestamps
    end
  end
end
