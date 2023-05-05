class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :username, :bio, :image

  has_many :user_activities
  has_many :activities, through: :user_activities
  has_many :user_interests
  has_many :interests, through: :user_interests

  def image 
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end
end

 