class CreateUserInterests < ActiveRecord::Migration[6.1]
  def change
    create_table :user_interests do |t|
      t.string :userinterest
      t.integer :user_id

      t.timestamps
    end
  end
end
