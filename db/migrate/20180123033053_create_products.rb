class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string :title
      t.text :description
      t.string :image
      t.float :price
      t.string :unit
      t.float :avg_rate
      t.integer :quantity
      t.references :category, foreign_key: true

      t.timestamps
    end
  end
end
