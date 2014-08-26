default_url_options_lambda = ->{{locale: I18n.locale}}

class DynamicallyResolvedObject < Delegator

  attr_accessor :resolver
  protected :resolver=

  def __getobj__
    resolver.call
  end

  def __setobj__(value)
    self.resolver = value.to_proc
  end

end

# this provides default url options to the main_app route across requests running
# in the context of the both the application and all engines.
Rails.application.routes.default_url_options = DynamicallyResolvedObject.new(default_url_options_lambda)
