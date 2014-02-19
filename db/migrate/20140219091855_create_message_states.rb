class CreateMessageStates < ActiveRecord::Migration
  def change
    create_table :message_states do |t|
      t.string :name
      t.index :name

      t.timestamps
    end
  end
end
