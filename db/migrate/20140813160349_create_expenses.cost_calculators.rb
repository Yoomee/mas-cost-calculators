# This migration comes from cost_calculators (originally 20140813155621)
class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :cost_calculators_expenses do |t|
      t.string :name
      t.integer :min
      t.integer :mid
      t.integer :max

      t.references :calculator, index: true
    end
  end
end
