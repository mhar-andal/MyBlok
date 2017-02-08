class SessionsController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  include SessionsHelper
  def new
  end

  def create
    @user = User.find_by(username: user_deets[:username])
    p @user
    if @user
      if @user.authenticate(user_deets[:password])
        login_user

        redirect_to root_path
      else
        @user.errors.messages[:That] = ["combination of username and password can't be found"]
        render :action => 'new'
      end
    else
      @user = User.new
      @user.errors.messages[:username] = ["doesn't exist"]
      render :action => 'new'
    end
  end

  def destroy
    logout_user
    redirect_to root_path
  end

private
  def user_deets
      params.require(:user).permit(:username, :password)
  end
end
