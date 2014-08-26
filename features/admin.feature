@logged_in
Feature: Cost Calculator admin
  In order to provide cost calculators to partners
  As a Money Advice Service admin
  I want to manage the calculators

@javascript
Scenario: Creating a calculator
  Given there are no calculators
  And there is a partner
  When I fill in the calculator form and submit
  Then the calculator was created

Scenario: Creating a partner
  Given there are no partners
  When I fill in the partner form and submit
  Then the partner was created

Scenario: Viewing a list of partners
  Given there are 3 partners
  When I go to the list of partners
  Then I see the partners

Scenario: Creating a widget
  Given there is a calculator
  And there is a partner
  When I go to create a new widget
  And I fill in the widget form and submit
  Then the widget was created

Scenario: Creating a widget
  Given there is a calculator
  And there is a partner
  When I go to create a new widget
  And I fill in the widget form and submit
  Then the widget was created