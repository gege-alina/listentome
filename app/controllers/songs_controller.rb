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
    @song = Song.new(song_params)

    respond_to do |format|
      if @song.save
        
        @us = UserSong.new(:user_id => current_user.id, :song_id => @song.id, :boost => 0)

        if @us.save
          format.html { redirect_to :controller=>'home', :action => 'index' }
        else
          format.html { render action: 'new' }
          format.json { render json: @us.errors, status: :unprocessable_entity }
        end
      else
        format.html { render action: 'new' }
        format.json { render json: @song.errors, status: :unprocessable_entity }
      end
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

  def boostSong
   @song = UserSong.where(user_id: params[:user_id])
   @user = User.where(id: params[:id])
   if @user.points=0 or ! @user.points
      return false
   else 
        @user.points = @user.points-1
        @user.save
        @song.boost = @song.boost+1
        @song.save
      return true
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
