class AddUserNameToToDos < ActiveRecord::Migration[5.2]
  def change
    add_column :to_dos, :username, :string, null: false, default: "unknown"
  end
end
