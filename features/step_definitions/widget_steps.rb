When(/^I go to create a new widget$/) do
  visit path_to("/calculators/#{@calculator.id}/widgets/new")
end

When(/^I fill in the widget form (with a partner name )?and submit$/) do |create_partner|
  @widget_count = CostCalculators::Widget.count
  @widget = FactoryGirl.build(:widget)
  select(@partner.name, :from => 'widget_partner_id')
  click_button('Create Widget')
end

Then(/^the widget was created$/) do
  expect(CostCalculators::Widget.count).to eq(@widget_count + 1)
end