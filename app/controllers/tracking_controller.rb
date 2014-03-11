require 'google/api_client'
require 'date'
require 'resque'

class TrackingController < ApplicationController
  before_filter :authenticate_user!
  
  def index
    Resque.enqueue(FetchAnalytics)
  end
end