class InterestSerializer < ActiveModel::Serializer
  attributes :id, :name, :category

  has_many :user_interests

  has_many :users, through: :user_interests
end
