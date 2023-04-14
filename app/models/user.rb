class User < ApplicationRecord
    has_secure_password

    has_many :user_activities
    has_many :interested_activities, through: :user_activities, conditions: { user_activities: {interested: true} }
    has_many :visited_activities, through: :user_activities, conditions: { user_activities: {visited: true}}
    has_many :review_content

    validates :username, presence: true, uniqueness: true
end
