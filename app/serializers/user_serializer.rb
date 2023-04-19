class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :password_digest

  has_many :user_activities
  has_many :activities, through: :user_activities
end
