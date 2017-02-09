class HomepageController < ApplicationController
  def index
    @homepage = true
    # render(:layout => "layouts/loggedin")
  end

  def loggedin
    render(:layout => "layouts/loggedin")
  end

  
end
