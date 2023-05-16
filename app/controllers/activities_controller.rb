class ActivitiesController < ApplicationController
    skip_before_action :authorize, only: [:index, :update] 

    def index 
        activities = Activity.all.with_attached_image 
        render json: activities 
    end

    def show 
        activity = Activity.find_by(id: params[:id])
        render json: activity
    end

    def create
        activity = Activity.create!(activity_params)
        render json: activity, status: 201
    end

    def update 
        activity = Activity.find_by(id: params[:id])
        activity.update!(activity_params)
        render json: activity, status: 202
    end

    private 

    def activity_params 
        params.permit(:title, :neighborhood, :cost, :address, :phone_number, :website, :image)
    end

    # add :image to activity_params if users can create them
end
