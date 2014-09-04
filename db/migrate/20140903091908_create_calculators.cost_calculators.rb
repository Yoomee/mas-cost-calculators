# This migration comes from cost_calculators (originally 20140811132124)
class CreateCalculators < ActiveRecord::Migration
  def change
    create_table :cost_calculators_calculators do |t|
      t.string :name
      t.text :primary_text
      t.text :secondary_text
      t.text :blockquote
    end
  end
end
