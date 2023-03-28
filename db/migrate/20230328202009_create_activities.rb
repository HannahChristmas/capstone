class CreateActivities < ActiveRecord::Migration[6.1]
  def change
    create_table :activities do |t|
      t.string :title
      t.string :neighborhood
      t.integer :cost
      t.string :address
      t.string :phone_number
      t.string :website
      t.string :notes
      t.string :image_url

      t.timestamps
    end
  end
end
