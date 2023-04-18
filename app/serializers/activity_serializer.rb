class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :title, :neighborhood, :cost, :address, :phone_number, :website
  has_many :user_activities

end
