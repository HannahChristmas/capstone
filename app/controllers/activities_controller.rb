class ActivitiesController < ApplicationController
    skip_before_action :authorize, only: [:index] 

    def index 
        activities = Activity.all 
        render json: activities 
    end
end
