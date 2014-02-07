class HomeController < ApplicationController
	def index
		puts "ceva"
		@song = Song.new
		@songs = Song.all
	end
end
