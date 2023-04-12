class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :password_digest
end
