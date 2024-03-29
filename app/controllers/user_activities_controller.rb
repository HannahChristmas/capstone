class UserActivitiesController < ApplicationController
    skip_before_action :authorize, only: [:destroy, :update] 

    def index 
        user_activities = @current_user.user_activities
        render json: user_activities, status: 200
    end

    def show 
        user_activity = UserActivity.find_by(id: params[:id])
        render json: user_activity, status: 200
    end

    def create
        user_activity = UserActivity.create!(user_activity_params)
        user_activity.user = @current_user
        render json: user_activity, status: 200
    end

    def update 
        user_activity = UserActivity.find_by(id: params[:id]) 
        user_activity.update!(user_activity_params)
        deleted_user_activity_id = user_activity.delete_if_not_interested_or_visited

        render json: { user_activity: user_activity, deleted_user_activity_id: deleted_user_activity_id }, status: 202
    end 

    def destroy 
        user_activity = UserActivity.find(params[:id])
        user_activity.destroy 
        head :no_content
    end

    private 

    def user_activity_params
        params.require(:user_activity).permit(:activity_id, :user_id, :interested, :visited)
    end
end
