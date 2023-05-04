class User < ApplicationRecord
    has_secure_password

    has_many :user_activities
    has_many :user_interests
    # has_many :interested_activities, -> { where(user_activities: { interested: true }) }, through: :user_activities, source: :activity
    # has_many :visited_activities, -> { where(user_activities: { visited: true }) }, through: :user_activities, source: :activity
    # has_many :review_content
    has_many :activities, through: :user_activities

    validates :username, presence: true, uniqueness: true
end
