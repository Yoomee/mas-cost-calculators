begin
  CostCalculators::User
rescue NameError
  puts 'has not loaded engine code yet'
end

FactoryGirl.define do
  factory :cost_calculator_user, class: CostCalculators::User do
    sequence :first_name do |n|
      "Admin #{n}"
    end
    last_name 'Administrator'
    sequence :email do |n|
      "admin#{n}@example.com"
    end
    password 'password123'
  end

  factory :calculator, class: CostCalculators::Calculator do
    sequence :name do |n|
      "Calculator #{n}"
    end
  end

  factory :expense, class: CostCalculators::Expense do
    calculator
    sequence :name do |n|
      "Expense #{n}"
    end
  end

  factory :partner, class: CostCalculators::Partner do
    sequence :name do |n|
      "Partner #{n}"
    end
  end

  factory :widget, class: CostCalculators::Widget do
    calculator
    partner
  end

end