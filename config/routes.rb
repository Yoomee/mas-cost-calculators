Rails.application.routes.draw do

  scope "/:locale", :locale => /en|cy/ do
    mount CostCalculators::Engine => "/quiz"
  end

  root :to => redirect('/en/cost_calculators')

end
