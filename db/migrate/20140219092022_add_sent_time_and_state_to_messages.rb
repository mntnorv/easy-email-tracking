class AddSentTimeAndStateToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :sent_at, :timestamp
    add_reference :messages, :message_state, index: true
  end
end
