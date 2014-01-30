class HomeController < ApplicationController
	def index
		puts "ceva"
		@song = Song.new
	end
end
