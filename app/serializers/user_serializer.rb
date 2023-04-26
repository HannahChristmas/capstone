class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio

  has_many :user_activities
  has_many :activities, through: :user_activities
end

