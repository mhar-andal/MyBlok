class UsersController < ApplicationController
  include SessionsHelper
  skip_before_filter  :verify_authenticity_token
  def new
    @user = User.new
  end

  def create
    p user_deets
    @user = User.new(user_deets)
    if @user.save
      login_user
      redirect_to(root_path)
    else
      render action: 'new'
    end
  end

  def show
    @user = User.find_by(id: params[:id])
  end

  def edit
  end

  def update
  end


private
  def user_deets
      params.require(:user).permit(:email, :password)
  end
end
