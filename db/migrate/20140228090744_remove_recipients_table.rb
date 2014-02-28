class RemoveRecipientsTable < ActiveRecord::Migration
  def change
    drop_table :recipients
    
    change_table :messages do |t|
      t.text :recipients
    end
  end
end
