class User < ApplicationRecord
    has_secure_password
    
    has_one_attached :image

    has_many :user_activities
    has_many :user_interests

    has_many :activities, through: :user_activities
    has_many :interests, through: :user_interests


    validates :username, presence: true, uniqueness: true
end
