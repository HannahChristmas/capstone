class UserInterest < ApplicationRecord
    belongs_to :user
    belongs_to :interest

    validates :user_id, uniqueness: { scope: :interest_id, message: "You have already added this to your interests" }

end
