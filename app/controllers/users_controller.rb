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

  def blok
    @user = current_user
    render action: 'blok'
  end

  def show
  end

  def edit
  end

  def update
  end

  def newblock
    render(:layout => "layouts/loggedin")
  end

  def insert_publickey
    @user = current_user
    @user.public_key = params[:key]
    @user.save
    p @user.errors
  end

  def keys
    if !logged_in
      @error = "Please log in to access this page"
    else
      render(:layout => "layouts/loggedin")
    end
  end


private
  def user_deets
      params.require(:user).permit(:username, :password)
  end
end
