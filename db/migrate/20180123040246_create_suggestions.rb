class CreateSuggestions < ActiveRecord::Migration[5.1]
  def change
    create_table :suggestions do |t|
      t.string :title
      t.string :image
      t.text :description
      t.float :price
      t.text :note
      t.boolean :status
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
