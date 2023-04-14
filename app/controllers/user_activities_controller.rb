class UserActivitiesController < ApplicationController
    def index 
        user_activities = @current_user.user_activities
        render json: user_activities, status: 200
    end

    def create
        user_activity = UserActivity.find_by(user_id: @current_user.id, activity_id: params[:activity_id]) 

        if user_activity 
            user_activity.update(interested: !user_activity.interested)
            user_activity.delete_if_not_interested_or_visited
         else 
            user_activity = UserActivity.create(user_activity_params)
            user_activity.user = @current_user
         end

        render json: user_activity, status: 200
    end

    # def update
    #     user_activity = UserActivity.find(params[:id])
    #     user_activity.update(user_activity_params)
    #     user_activity.delete_if_not_interested_or_visited
    #     render json: user_activity, status: 200
    # end

    def destroy 
        user_activity = @current_user.user_activities.find(params[:id])
        user_activity.destroy 
        head :no_content
    end

    private 

    def user_activity_params
        params.require(:user_activity).permit(:activity_id, :user_id, :interested)
    end
end
