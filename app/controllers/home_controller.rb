class HomeController < ApplicationController
	def index

		puts "ceva"
		@song = Song.new
		@songs = Song.first(5)


	  if user_signed_in?
	  	@song = Song.new
	  end


	  if Song.all != nil
	  	@songs = Song.first(5)
	  else
	  	@songs = []
	  end
	  

	end

	def addPointsToUser
	  @user_song = UserSong.where(song_id: song_id_param)

	  @user = User.where(id: @user_song.user_id)
	  @user.points += @user_song.boost
	  @user.save

	  @user_song.boost = 0
	  @user_song.save
	end

end
