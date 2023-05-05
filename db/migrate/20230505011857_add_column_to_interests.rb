class AddColumnToInterests < ActiveRecord::Migration[6.1]
  def change
    add_column :interests, :category, :string
  end
end
