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
end
