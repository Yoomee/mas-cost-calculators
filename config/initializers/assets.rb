# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'
Rails.application.config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components')
Rails.application.config.assets.precompile += %w(cost_calculators_admin.css cost_calculators/admin.js cost_calculators.js )


 Rails.application.config.assets.precompile += %w(
                                   cost_calculators/images
                                   components/Toggler.js
                                   html_inspector.js
                                   lib/MicroEvent.js
                                   modules/common.js
                                   modules/globals.js
                                   modules/i18n.js
                                   modules/log.js
                                   modules/mas_collapsable.js
                                   modules/mas_pubsub.js
                                   modules/mas_scrollTracking.js
                                   styleguide.js
                                   supports.js
                                   translations/cy.js
                                   translations/en.js
                                   dough/assets/js/lib/*.js
                                   dough/assets/js/components/*.js)



Rails.application.config.assets.precompile += %w(html5shiv/dist/html5shiv.js
                                   jquery/dist/jquery.js
                                   jquery-waypoints/waypoints.js
                                   jquery-ujs/src/rails.js
                                   eventsWithPromises/src/eventsWithPromises.js
                                   rsvp/rsvp.amd.js
                                   requirejs/require.js
                                   modernizer-flexbox-cssclasses.js)


# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
