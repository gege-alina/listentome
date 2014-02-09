class AddColumnToSongs < ActiveRecord::Migration
  def change
  	add_column :songs, :playlist, :boolean, default: true
  	add_column :songs, :playing, :boolean, default: false
  	add_column :songs, :last_played_at, :timestamp
  end
end
