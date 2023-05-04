class UserInterestSerializer < ActiveModel::Serializer
  attributes :id, :userinterest, :user_id, :activity_id
end
