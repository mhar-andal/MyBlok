class HomepageController < ApplicationController
  include SessionsHelper
  def index
    if logged_in
      render "homepage/loggedin", :layout => "layouts/loggedin"
    end
  end

  def loggedin
    render(:layout => "layouts/loggedin")
  end
end
