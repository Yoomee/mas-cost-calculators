# This migration comes from cost_calculators (originally 20140811105828)
class DeviseCreateCostCalculatorsUsers < ActiveRecord::Migration
  def change
    create_table(:cost_calculators_users) do |t|
      t.string :first_name
      t.string :last_name
      t.boolean :admin, :default => false

      ## Database authenticatable
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string   :current_sign_in_ip
      t.string   :last_sign_in_ip

      ## Confirmable
      # t.string   :confirmation_token
      # t.datetime :confirmed_at
      # t.datetime :confirmation_sent_at
      # t.string   :unconfirmed_email # Only if using reconfirmable

      ## Lockable
      # t.integer  :failed_attempts, default: 0, null: false # Only if lock strategy is :failed_attempts
      # t.string   :unlock_token # Only if unlock strategy is :email or :both
      # t.datetime :locked_at


      t.timestamps
    end

    add_index :cost_calculators_users, :email,                unique: true
    add_index :cost_calculators_users, :reset_password_token, unique: true
    # add_index :cost_calculators_users, :confirmation_token,   unique: true
    # add_index :cost_calculators_users, :unlock_token,         unique: true
  end
end
