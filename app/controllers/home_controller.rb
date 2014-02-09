class HomeController < ApplicationController
	def index
		
	  if user_signed_in?
	  	@song = Song.new
	  end


	  if Song.all != nil
	  	@songs = bestFive
    	@songs.sort! { |b,a| a.UserSong.boost <=> b.UserSong.boost }
    	
    	@youtubeId = 'NazVKnD-_sQ'

	  else
	  	@songs = []
	  end
	  
	end


 	def bestFive
    	return Song.where(playlist: TRUE).order(:created_at).includes(:UserSong).order('"user_songs"."boost"').limit(5)
  	end


	def addPointsToUser
	  user_song = UserSong.where(song_id: params[:song_id]).first

	  user = User.find(user_song.user_id)
	  user.points += user_song.boost
	  user.save

	  user_song.boost = 0
	  user_song.save
	end

	def boostSong(song_id)
	  termsong = Song.find(song_id)
	  termsong.playing = false
	  termsong.last_played_at = (datetime('now'))
	  termsong.save

	  song = Song.order(boost: :desc).limit(1).where('playlist' => true)
	  song.playing = true
	  song.playlist = false
	  song.save
	end

end
