class AddColumnsToUser < ActiveRecord::Migration
  def change
  	add_column :users, :first_name, :string
  	add_column :users, :last_name, :string
	add_column :users, :points, :integer, default: 10
  	add_column :users, :avatar_url, :string
  	add_column :users, :username, :string
  	add_column :users, :provider, :string
  	add_column :users, :uid, :string
  end
end
