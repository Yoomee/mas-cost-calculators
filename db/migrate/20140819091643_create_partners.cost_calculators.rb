# This migration comes from cost_calculators (originally 20140819081629)
class CreatePartners < ActiveRecord::Migration
  def change
    create_table :cost_calculators_partners do |t|
      t.string :name
      t.timestamps
    end
  end
end
