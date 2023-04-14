class UserActivitiesController < ApplicationController
    def index 
        user_activities = @current_user.user_activities
        render json: user_activities, status: 200
    end
end
