Given(/^there (is|are) (no|a|\d+) partners?$/) do |is_are, partners_count|
  CostCalculators::Partner.destroy_all
  unless partners_count == 'no'
    partners_count = partners_count == 'a' ? 1 : partners_count.to_i
    @partners = [].tap do |arr|
      partners_count.times do
        arr << FactoryGirl.create(:partner)
      end
    end
    @partner = @partners.first
  end
end

When(/^I fill in the partner form and submit$/) do
  visit path_to('/partners/new')
  @partner = FactoryGirl.build(:partner)
  fill_in('partner_name', :with => @partner.name)
  click_button('Create Partner')
end

Then(/^the partner was created$/) do
  expect(CostCalculators::Partner.count).to eq((@partner_count || 0) + 1)
end

When(/^I go to the list of partners$/) do
  visit path_to('/partners')
end

Then(/^I see the partners$/) do
  @partners.each do |partner|
    expect(page).to have_content(partner.to_s)
  end
end