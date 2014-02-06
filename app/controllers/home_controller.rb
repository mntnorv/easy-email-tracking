class HomeController < ApplicationController
  def index
    render "index"
  end
  
  def learn_more
    render "learn_more"
  end
  
  def details
    render "details"
  end
end