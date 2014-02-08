class HomeController < ApplicationController
	def index

		puts "ceva"
		@song = Song.new
		@songs = Song.all

	  if user_signed_in?
	  	@song = Song.new
	  end


	  if Song.all != nil
	  	@songs = Song.all
	  else
	  	@songs = []
	  end
	  
	  #startTime va fi timpul luat din baza ( sysdate - de cand a inceput melodia )
	  #youtubeId va fi id-ul melodiei curente

	  @startTime = 20 
	  @youtubeId = 'JW5meKfy3fY'

	end
end
