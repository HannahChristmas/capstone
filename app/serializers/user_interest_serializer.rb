class UserInterestSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :interest_id

  belongs_to :user
  belongs_to :interest
end
