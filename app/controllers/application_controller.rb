class ApplicationController < ActionController::Base
  protect_from_forgery

   def parent_template
    'layouts/application'
  end
  helper_method :parent_template
end
