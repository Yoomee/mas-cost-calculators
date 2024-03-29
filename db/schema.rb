# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140903091912) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cost_calculators_calculators", force: true do |t|
    t.string "name"
    t.text   "primary_text"
    t.text   "secondary_text"
    t.text   "blockquote"
    t.date   "countdown_date"
    t.string "countdown_event"
    t.string "summary_cta_title_1"
    t.string "summary_cta_title_2"
    t.string "summary_cta_title_3"
    t.text   "summary_cta_text_1"
    t.text   "summary_cta_text_2"
    t.text   "summary_cta_text_3"
    t.string "summary_cta_link_1"
    t.string "summary_cta_link_2"
    t.string "summary_cta_link_3"
  end

  create_table "cost_calculators_expense_pages", force: true do |t|
    t.string   "name"
    t.text     "primary_text"
    t.integer  "calculator_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "cost_calculators_expense_pages", ["calculator_id"], name: "index_cost_calculators_expense_pages_on_calculator_id", using: :btree

  create_table "cost_calculators_expenses", force: true do |t|
    t.string  "name"
    t.string  "values"
    t.integer "expense_page_id"
  end

  add_index "cost_calculators_expenses", ["expense_page_id"], name: "index_cost_calculators_expenses_on_expense_page_id", using: :btree

  create_table "cost_calculators_partners", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "cost_calculators_users", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.boolean  "admin",                  default: false
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "cost_calculators_users", ["email"], name: "index_cost_calculators_users_on_email", unique: true, using: :btree
  add_index "cost_calculators_users", ["reset_password_token"], name: "index_cost_calculators_users_on_reset_password_token", unique: true, using: :btree

  create_table "cost_calculators_widgets", force: true do |t|
    t.integer  "calculator_id"
    t.integer  "partner_id"
    t.string   "primary_bg_color"
    t.string   "primary_text_color"
    t.string   "secondary_bg_color"
    t.string   "secondary_text_color"
    t.string   "button_color"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "cost_calculators_widgets", ["calculator_id"], name: "index_cost_calculators_widgets_on_calculator_id", using: :btree
  add_index "cost_calculators_widgets", ["partner_id"], name: "index_cost_calculators_widgets_on_partner_id", using: :btree

end
