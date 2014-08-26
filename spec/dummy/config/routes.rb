Rails.application.routes.draw do

  scope "(:locale)", :locale => /en|cy/ do
    mount CostCalculators::Engine => "/calculator"
  end

  root :to => redirect('/en/calculators')

end
