# This migration comes from cost_calculators (originally 20140811132124)
class CreateCalculators < ActiveRecord::Migration
  def change
    create_table :cost_calculators_calculators do |t|
      t.string :name
    end
  end
end
