class HomeController < ApplicationController
	def index

		puts "ceva"
		@song = Song.new
		@songs = Song.first(5)


	  if user_signed_in?
	  	@song = Song.new
	  end


	  if Song.all != nil
	  	@songs = Song.joins(:UserSong).first(5)
	  else
	  	@songs = []
	  end
	  
	  #startTime va fi timpul luat din baza ( sysdate - de cand a inceput melodia )
	  #youtubeId va fi id-ul melodiei curente

	  @startTime = 20 
	  @youtubeId = 'JW5meKfy3fY'

	end

	def addPointsToUser
	  user_song = UserSong.where(song_id: params[:song_id]).first

	  user = User.find(user_song.user_id)
	  user.points += user_song.boost
	  user.save

	  user_song.boost = 0
	  user_song.save
	end

end
