 CostCalculators::User.create(
                           :first_name => "Greg",
                           :last_name => "Woodcock",
                           :admin => true,
                           :email => "greg@yoomee.com",
                           :password => "12345678")

CostCalculators::User.create(
                           :first_name => "Money",
                           :last_name => "Advice Service",
                           :admin => true,
                           :email => "mas@yoomee.com",
                           :password => "cost1234")
 

partner = CostCalculators::Partner.create(:name => "MAS")

calculator = CostCalculators::Calculator.create(
                  :name => "Baby costs calculator",
                  :primary_text => "Did you know that a baby could cost as much as £7,200 or as little as £1,600 in their first year, excluding childcare? Use the calculator to check how much the essentials could cost you.",
                  :secondary_text => "The costs are only a guide based on our own research. You may be able to find things more cheaply, or you may want things that we haven't included.",
                  :blockquote => "Your choices are confidential – we won't see them, store them or pass them to anyone else.")



page = calculator.expense_pages.create(:primary_text => "We've estimated how much your baby could cost you through to their first birthday based on the options you've chosen. Look to see what we've included in the estimated costs — you can remove anything you don't want. Use the sliders to choose how much you want to spend in each area.")

page.expenses.create(:name => "Nursery Furniture", :values => ["250", "500", "1000"])
page.expenses.create(:name => "Buggy", :values => ["80", "350", "600"])
page.expenses.create(:name => "Baby car seat", :values => ["80", "130", "220"])


CostCalculators::Widget.create(
                                :calculator => calculator,
                                :partner => partner)
