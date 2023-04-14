class ChangeVisitedDefaultValueInUserActivities < ActiveRecord::Migration[6.1]
  def change
    change_column :user_activities, :visited, :boolean, default: false
  end
end
