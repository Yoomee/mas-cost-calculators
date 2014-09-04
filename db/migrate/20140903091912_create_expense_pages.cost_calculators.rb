# This migration comes from cost_calculators (originally 20140903100145)
class CreateExpensePages < ActiveRecord::Migration
  def change
    create_table :cost_calculators_expense_pages do |t|
      t.text :primary_text
      t.references :calculator, index: true
    end
  end
end
