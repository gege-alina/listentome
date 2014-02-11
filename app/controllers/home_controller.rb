class HomeController < ApplicationController
	def index
		
	  if user_signed_in?
	  	@song = Song.new
	  end

	  
	  @songs = bestFive

	  if !@songs.nil? && @songs.length != 0 
	  	
    	@songs.sort! { |b,a| a.UserSong.boost <=> b.UserSong.boost }
    	currentSong = Song.where(playing: true).first

    	puts @songs[0].inspect

    	if currentSong.nil?

    		firstSong = @songs[0]
    		firstSong.playing = true
        	firstSong.playlist = false
        	firstSong.last_played_at = DateTime.now
        	firstSong.save

    		@youtubeId = firstSong.link
	    	@songId = firstSong.id
	    	@startTime = 0

    	else
	    	@youtubeId = currentSong.link
	    	@songId = currentSong.id
	    	@startTime = 0
	    	#(DateTime.now.to_time.to_i - currentSong.last_played_at.to_time.to_i).abs
	    end
	  else
	  	@songs = []
	  	@youtubeId = ""
	  	@songId = ""
	  	@startTime = ""
	  end
	end


 	def bestFive
    	return Song.where(playlist: true).order(:created_at).includes(:UserSong).limit(5)
  	end


	def addPointsToUser
	  user_song = UserSong.where(song_id: params[:song_id]).first

	  user = User.find(user_song.user_id)
	  user.points = user.points + user_song.boost
	  user.save

	  user_song.boost = 0
	  user_song.save
	end


end
