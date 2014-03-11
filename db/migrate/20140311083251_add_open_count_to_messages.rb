class AddOpenCountToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :open_count, :integer, :default => 0
  end
end
