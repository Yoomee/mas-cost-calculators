class ApplicationController < ActionController::Base
  # include Localisation

  protect_from_forgery

  def parent_template
    'layouts/application'
  end
  helper_method :parent_template

  def redirect_to_cost_calculators
    redirect_to cost_calculators_path
  end
end
