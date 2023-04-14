class Activity < ApplicationRecord
    has_many :user_activities
    
    has_many :interested_users, -> { where(user_activities: { interested: true }) }, through: :user_activities, source: :activity
    has_many :visited_users, -> { where(user_activities: { visited: true }) }, through: :user_activities, source: :activity
    has_many :review_content


end
