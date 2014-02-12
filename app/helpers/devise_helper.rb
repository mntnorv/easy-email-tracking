module DeviseHelper
  def devise_error_messages!
    return Hash[resource.errors.map { |key, value|
      [key, value.capitalize]
    }]
  end
end