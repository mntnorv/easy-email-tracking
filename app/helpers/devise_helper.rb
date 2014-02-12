module DeviseHelper
  def devise_error_messages!
    errors = Hash[resource.errors.map { |key, value|
      [key, value.capitalize]
    }]
    
    return errors
  end
end