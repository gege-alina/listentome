class Song < ActiveRecord::Base
	has_many :Users, through: :UserSongs
	has_one :UserSong , :foreign_key => 'song_id'
end
