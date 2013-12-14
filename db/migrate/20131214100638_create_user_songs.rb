class CreateUserSongs < ActiveRecord::Migration
  def change
    create_table :user_songs do |t|
      t.integer :song_id
      t.integer :user_id

      t.timestamps
    end
  end
end
