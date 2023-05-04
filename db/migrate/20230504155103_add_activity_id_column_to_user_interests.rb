class AddActivityIdColumnToUserInterests < ActiveRecord::Migration[6.1]
  def change
    add_column :user_interests, :activity_id, :integer
  end
end
