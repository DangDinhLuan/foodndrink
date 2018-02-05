class AddChatworkIdToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :chatwork_id, :string
  end
end
