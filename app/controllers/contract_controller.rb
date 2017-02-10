class ContractController < ApplicationController
    include SessionsHelper
  def index
    @user = current_user
  end

  def contract
    @user = current_user
  end

  def store
    @user = current_user
  end


end
