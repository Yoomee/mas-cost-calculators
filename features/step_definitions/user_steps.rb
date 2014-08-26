Given /^I am logged in( as an admin)?$/ do |admin|
  password = 'secretpassword'
  @current_user = FactoryGirl.create(:cost_calculator_user, :password => password, :admin => admin.present?)

  visit path_to('/users/sign_in')
  fill_in "user_email", :with => @current_user.email
  fill_in "user_password", :with => password
  click_on "Log in"
end