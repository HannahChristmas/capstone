class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authorize

  rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response


  private

  def authorize
    @current_user = User.find_by(id: session[:user_id])
    render json: { errors: ["Not authorized"] }, status: 401 unless @current_user
  end

  def handle_invalid(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: 422
  end

  def render_not_found_response
    render json: {error: ["Not found"]}, status: :not_found
  end
end
