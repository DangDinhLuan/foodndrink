class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.string :address
      t.float :total
      t.text :note
      t.boolean :status
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
