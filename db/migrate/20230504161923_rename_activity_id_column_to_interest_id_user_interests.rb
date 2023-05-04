class RenameActivityIdColumnToInterestIdUserInterests < ActiveRecord::Migration[6.1]
  def change
    rename_column :user_interests, :activity_id, :interest_id
  end
end
