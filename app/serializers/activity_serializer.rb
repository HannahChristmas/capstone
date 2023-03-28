class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :title, :neighborhood, :cost, :address, :phone_number, :website
end
