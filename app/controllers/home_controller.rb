class HomeController < ApplicationController
	def index
<<<<<<< HEAD

		puts "ceva"
		@song = Song.new
		@songs = Song.first(5)

=======
		
>>>>>>> 2bec55d9572e343d074c5f35d4178c9dac68d0ba
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
