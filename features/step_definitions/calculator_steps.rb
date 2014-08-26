Given(/^there (is|are) (no|a|\d+) calculator(s)?$/) do |is_are, calculators_count, plural|
  CostCalculators::Calculator.destroy_all
  unless calculators_count == 'no'
    calculators_count = calculators_count == 'a' ? 1 : calculators_count.to_i
    @calculators = [].tap do |arr|
      calculators_count.times do
        arr << FactoryGirl.create(:calculator)
      end
    end
    @calculator = @calculators.first
  end
end

When(/^I fill in the calculator form and submit$/) do
  visit path_to('/calculators/new')
  @calculator = FactoryGirl.build(:calculator)
  fill_in('calculator_name', :with => @calculator.name)

  (0..2).each do |idx|
    @expense = FactoryGirl.build(:expense)
    all(".nested-fields textarea[id$='_name']")[idx].set(@expense.name)
    click_link("Add another expense") unless idx == 2
  end
  click_button('Create calculator')
end

Then(/^the calculator was created$/) do
  expect(CostCalculators::Calculator.count).to eq(1)
end
