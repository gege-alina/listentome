class Song < ActiveRecord::Base
	has_many :Users, through: :UserSongs
end
