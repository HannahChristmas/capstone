class InterestsController < ApplicationController
    skip_before_action :authorize, only: [:index] 

    def index 
        interests = Interest.all 
        render json: interests 
    end

    def show 
        interest = Interest.find_by(id: params[:id])
        render json: interest
    end
end
