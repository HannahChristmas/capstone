class ActivitiesController < ApplicationController
    skip_before_action :authorize, only: [:index] 

    def index 
        activities = Activity.all.with_attached_image 
        render json: activities 
    end

    def show 
        activity = Activity.find_by(id: params[:id])
        render json: activity
    end

    # add :image to activity_params if users can create them
end
