# This migration comes from cost_calculators (originally 20140811132124)
class CreateCalculators < ActiveRecord::Migration
  def change
    create_table :cost_calculators_calculators do |t|
      #Welcome screen fields
      t.string :name
      t.text :primary_text
      t.text :secondary_text
      t.text :blockquote

      #Summary screen fields
      t.string :summary_cta_title_1
      t.string :summary_cta_title_2
      t.string :summary_cta_title_3

      t.text :summary_cta_text_1
      t.text :summary_cta_text_2
      t.text :summary_cta_text_3

      t.string :summary_cta_link_1
      t.string :summary_cta_link_2
      t.string :summary_cta_link_3
    end
  end
end
