class AddColumnsToUser < ActiveRecord::Migration
  def change
  	add_column :users, :first_name, :string
  	add_column :users, :last_name, :string
	add_column :users, :points, :integer
  	add_column :users, :avatar_url, :string
  	add_column :users, :username, :string

  end
end