class HomeController < ApplicationController
  def index
    if user_signed_in?
      redirect_to dashboard_path, status: :found
    end
  end
end