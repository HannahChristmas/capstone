class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio

  has_many :user_activities
  has_many :activities, through: :user_activities
  has_many :user_interests
  has_many :interests, through: :user_interests
end

