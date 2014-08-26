module Localisation
  extend ActiveSupport::Concern

  included do
    helper_method :alternate_locales
    before_action :set_locale

    unless Rails.env.development?
      rescue_from I18n::InvalidLocale, with: :not_found
    end
  end

  private

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def alternate_locales
    I18n.available_locales - Array(I18n.locale)
  end
end
