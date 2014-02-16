class CreateRecipients < ActiveRecord::Migration
  def change
    create_table :recipients do |t|
      t.string :name
      t.string :email
      t.references :message, index: true

      t.timestamps
    end
  end
end
