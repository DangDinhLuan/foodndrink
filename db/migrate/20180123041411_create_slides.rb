class CreateSlides < ActiveRecord::Migration[5.1]
  def change
    create_table :slides do |t|
      t.string :image
      t.string :title
      t.boolean :status

      t.timestamps
    end
  end
end
