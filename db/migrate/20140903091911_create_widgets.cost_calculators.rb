# This migration comes from cost_calculators (originally 20140819090250)
class CreateWidgets < ActiveRecord::Migration
  def change
    create_table :cost_calculators_widgets do |t|
      t.belongs_to :calculator
      t.belongs_to :partner

      t.string :primary_bg_color
      t.string :primary_text_color

      t.string :secondary_bg_color
      t.string :secondary_text_color

      t.string :button_color

      t.timestamps
    end
    add_index :cost_calculators_widgets, :calculator_id
    add_index :cost_calculators_widgets, :partner_id
  end
end
