class UsersController < ApplicationController
    def index 
        users = User.all 
        render json: users 
    end

    def show 
        render json: @current_user
    end
end
