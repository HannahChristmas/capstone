class UserActivitySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :activity_id, :visited, :interested, :review_content, :rating
end
