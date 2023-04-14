class Activity < ApplicationRecord
    has_many :user_activities
    
    has_many :interested_users, through: :user_activities, source: :user, conditions: { user_activities: {interested: true }}
    has_many :visited_users, through: :user_activities, source: :user, conditions: { user_activities: { visited: true } }
    has_many :review_content


end
