require "net/http"
require "uri"

class YoutubeController < ApplicationController

def self.validate_id(youtube_id)
  uri = URI.parse("http://gdata.youtube.com/feeds/api/videos/" + youtube_id)
  http = Net::HTTP.new(uri.host, uri.port)
  request = Net::HTTP::Get.new(uri.request_uri)
  response = http.request(request)
  return response.code
end

def self.youtube_data(youtube_id)
  if validate_id(youtube_id) == "200"
    return true
  else 
  	return false
  end
end

end
