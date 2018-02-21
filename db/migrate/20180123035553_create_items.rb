class CreateItems < ActiveRecord::Migration[5.1]
  def change
    create_table :items do |t|
      t.float :price
      t.integer :quantity
      t.references :product, foreign_key: true
      t.integer :order_id

      t.timestamps
    end
  end
end
