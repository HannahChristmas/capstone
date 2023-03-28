class CreateActivities < ActiveRecord::Migration[6.1]
  def change
    create_table :activities do |t|
      t.string :title
      t.string :neighborhood
      t.int :cost
      t.string :address
      t.string :phone_number
      t.string :website

      t.timestamps
    end
  end
end
