class ActivitySerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  
  attributes :id, :title, :neighborhood, :cost, :address, :phone_number, :website, :image, :category
  
  has_many :user_activities
  has_many :users, through: :user_activities

  def image 
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end

end
