class UserSong < ActiveRecord::Base
	belongs_to :Song
	belongs_to :User
end
