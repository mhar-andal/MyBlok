class HomepageController < ApplicationController
  def index
    @homepage = true
    # render(:layout => "layouts/loggedin")
  end
end
