class UserActivity < ApplicationRecord
    belongs_to :user 
    belongs_to :activity

    def delete_if_not_interested_or_visited
        self.destroy if !self.visited && !self.interested
    end
end
