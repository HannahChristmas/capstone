class Activity < ApplicationRecord
    has_one_attached :image

    has_many :user_activities
    
    # has_many :interested_users, -> { where(user_activities: { interested: true }) }, through: :user_activities, source: :activity
    # has_many :visited_users, -> { where(user_activities: { visited: true }) }, through: :user_activities, source: :activity
    # has_many :review_content
    has_many :users, through: :user_activities


end
