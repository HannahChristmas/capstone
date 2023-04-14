class ChangeInterestedDefaultValueInUserActivities < ActiveRecord::Migration[6.1]
  def change
    change_column :user_activities, :interested, :boolean, default: false
  end
end
