class UsersController < ApplicationController
  include SessionsHelper
  skip_before_filter  :verify_authenticity_token
  def new
    @user = User.new
  end

  def create
    if params[:user][:password] == params[:users][:confirm_password]
      @user = User.new(user_deets)
      if @user.save
        login_user
        redirect_to "/keys"
      else
        render action: 'new'
      end
    else
      @user = User.new(username: params[:user][:username])
      @user.save
      @user.errors.messages[:password] = ["must match"]
      render action: 'new'
    end
  end

  def show
  end

  def edit
  end

  def update
  end

  def keys
    if !logged_in
      redirect_to(root_path)
    end
  end

private
  def user_deets
      params.require(:user).permit(:username, :password)
  end
end
