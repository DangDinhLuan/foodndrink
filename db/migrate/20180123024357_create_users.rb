class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.string :phone
      t.string :address
      t.string :remember_digest
      t.string :activation_digest
      t.datetime :activated_at
      t.boolean :activated
      t.boolean :admin

      t.timestamps
    end
  end
end
