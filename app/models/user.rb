class User < ApplicationRecord
    has_secure_password

    has_many :user_activities
    has_many :interested_activities, -> { where(user_activities: { interested: true }) }, through: :user_activities, source: :activity
    has_many :visited_activities, through: :user_activities, conditions: { user_activities: {visited: true}}
    has_many :review_content

    validates :username, presence: true, uniqueness: true
end
