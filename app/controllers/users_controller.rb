class UsersController < ApplicationController
    skip_before_action :authorize, only: [:index, :create] 

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id 
        render json: user, status: 201
    end

    def index 
        users = User.all 
        render json: users 
    end

    def show 
        render json: @current_user
    end

    private 

    def user_params 
        params.permit(:username, :password, :password_confirmation)
    end
end
