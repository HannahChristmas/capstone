class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :password_digest

  has_many :user_activities
end
