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
	  

	end
end
