class RemoveUserInterestColumnFromUserInterests < ActiveRecord::Migration[6.1]
  def change
    remove_column :user_interests, :userinterest, :string 
  end
end
