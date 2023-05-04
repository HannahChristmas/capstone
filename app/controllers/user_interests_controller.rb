class UserInterestsController < ApplicationController
    skip_before_action :authorize, only: [:create] 

    def index 
        user_interests = UserInterest.all 
        render json: user_interests 
    end

    def show 
        user_interest = UserInterest.find_by(id: params[:id])
        render json: user_interest
    end

    def create
        user_interest = UserInterest.create!(user_interest_params)
        # user_interest.user = @current_user
        render json: user_interest, status: 200
    end

    private 

    def user_interest_params
        params.require(:user_interest).permit(:interest_id, :user_id)
    end
end
