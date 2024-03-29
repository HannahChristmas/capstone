class UsersController < ApplicationController
    skip_before_action :authorize, only: [:index, :show, :create, :destroy] 
    
    def index 
        users = User.all.with_attached_image
        render json: users 
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id 
        render json: user, status: 201
    end

    def update 
        user = User.find_by(id: session[:user_id])
        # @current_user.update!(user_params)
        user.update!(user_params)
        render json: user, status: 202
    end

    def show 
        user = User.find_by(id: params[:id])
        render json: user
    end

    def login 
        user = @current_user
        render json: user
    end

    def destroy 
        user = User.find(params[:id])
        user.destroy 
        head :no_content
    end

    def my_interests
        my_interests = @current_user.interests
        render json: my_interests
    end

    private 

    def user_params 
        params.permit(:username, :password, :password_confirmation, :bio, :image)
    end
end
