class SongsController < ApplicationController
  before_action :set_song, only: [:show, :edit, :update, :destroy]

  # GET /songs
  # GET /songs.json
  def index
    @songs = Song.all
    @song = Song.last
  end

  # GET /songs/1
  # GET /songs/1.json
  def show
  end

  # GET /songs/new
  def new
    @song = Song.new
  end

  # GET /songs/1/edit
  def edit
  end

  # POST /songs
  # POST /songs.json
 def create

    @song = Song.new(:title => params[:title],:link => params[:youtubeId])

      if @song.save
        
        @us = UserSong.new(:user_id => current_user.id, :song_id => @song.id, :boost => 0)

        if @us.save
          render :text => '{ "status":true }'
        else
          render :text => '{ "status":false }'
        end
      else
        render :text => '{ "status":false }'
      end
      
  end 

  # PATCH/PUT /songs/1
  # PATCH/PUT /songs/1.json
  def update
    respond_to do |format|
      if @song.update(song_params)
        format.html { redirect_to @song, notice: 'Song was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @song.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /songs/1
  # DELETE /songs/1.json
  def destroy
    @song.destroy
    respond_to do |format|
      format.html { redirect_to songs_url }
      format.json { head :no_content }
    end
  end



  def getBestFive
    list = Song.where(playlist: TRUE).order(:created_at).joins(:UserSong).order('"user_songs"."boost" DESC').first(5)    
    render :text => list.to_json
  end

  # boostSong

  def boostSong
   us = UserSong.where(song_id: params[:song_id]).first
   user = User.find(us.user_id)
   
   if user.points == 0
        render :text => '{ "status":false }'
   else 
      user.points = user.points-1
      user.save
      us.boost = us.boost+1
      us.save
      render :text => '{ "status":true }'
   end
  end

  
  


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_song
      @song = Song.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def song_params
      required = [:title, :link, :desc]
      params.require(:song).permit(required)

      # params[:song]
    end

end
