class AddColumnToSongs < ActiveRecord::Migration
  def change
  	add_column :songs, :playlist, :boolean
  	add_column :songs, :last_played_at, :timestamp
  end
end
