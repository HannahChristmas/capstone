class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :title, :neighborhood, :cost, :address, :phone_number, :website
  has_many :user_activities
  # has_many :users, through: :user_activities
end
