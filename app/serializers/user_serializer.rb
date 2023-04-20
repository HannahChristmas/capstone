class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :password_digest

  has_many :user_activities
  has_many :activities, through: :user_activities
end


# {activities.map((activity) => activity.user_activities.map((userActivity) => {
#   if (userActivity.username = user?.username) {
#     console.log("interested activity titles:", activity.title)
#     {activity.user_activities.map((item) => {
#       console.log("ITEM: ", item.interested)
#     })}
#   }
# }))}