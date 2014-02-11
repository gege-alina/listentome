var HomeIndex = function () {
        this._initHome();

};


HomeIndex.prototype.selectors = {

	listSelector : '.list-group',
	listItemSelector : '.list-group-item',
	modalSelector : '.js-modalContainer',
	closeModalSelector : '.js-closeForm',
	saveModalSelector : '.js-saveForm',
	songTitleSelector : '.js-songTitle',
	youtubeLinkSelector : '.js-youtubeLink',
	bodyContainerSelector : '.js-bodyContainer',
	errorHolderSelector : '.js-errorHolder',
 	songVoteSelector : '.js-songVote',
 	songDescriptionSelector : '.js-songDescription',
 	documentSelector : '.js-document',
 	anchorRemoveSelector : '.remove-anchor',
 	currentSong : '.js-currentSong'

};

HomeIndex.prototype._initHome = function(){
    this._addDelegates();

    var currentSong = $(this.selectors.documentSelector).find(this.selectors.currentSong);
    var youtubeId = currentSong.attr('data-youtubeId');
    var startTime = currentSong.attr('data-startTime');

    if(youtubeId != '' && youtubeId != '/' && typeof youtubeId != 'undefined'){
    	    this._initYoutubeSWF(youtubeId,startTime);
    }

};


HomeIndex.prototype._initYoutubeSWF = function(youtubeId,startTime){

var params = { allowScriptAccess: "always" };
var atts = { id: "myytplayer" };
swfobject.embedSWF('https://youtube.com/v/'+ youtubeId + '?enablejsapi=1&playerapiid=ytplayer&version=3&start='+ startTime + '&autoplay=1&controls=1&showinfo=0&modestbranding=1&iv_load_policy=3',
						"ytapiplayer", "640", "390", "8", null, null, params, atts);

};

HomeIndex.prototype._addDelegates = function(){

$(this.selectors.listSelector).find(this.selectors.listItemSelector).on('click', $.proxy(this._preventDefaultListItem,this));


$(this.selectors.documentSelector).find(this.selectors.anchorRemoveSelector).on('click', $.proxy(this._preventDefaultListItem,this));
// modal stuff

var $modalContainer = $(this.selectors.modalSelector);

$modalContainer.find(this.selectors.saveModalSelector).on('click', $.proxy(this._addSong,this,$modalContainer));

$modalContainer.find(this.selectors.closeModalSelector).on('click', $.proxy(this._closeModal,this,$modalContainer));

// vote stuff 
$('#content_list').on('click', this.selectors.songVoteSelector,$.proxy(this._songVoteAction,this));

};

// problema turbolinks
HomeIndex.prototype._preventDefaultListItem = function(e){

e.preventDefault();

};


// submit-ul pentru modal 

HomeIndex.prototype._addSong = function(container, e){

	e.preventDefault();

	container.find(this.selectors.errorHolderSelector).empty();

	var title = container.find(this.selectors.songTitleSelector).val();
	var youtubeLink = container.find(this.selectors.youtubeLinkSelector).val();
	var description = container.find(this.selectors.songDescriptionSelector).val();


	var youtubeId = this.getYoutubeId(youtubeLink);

	if(youtubeId === ''){

		container.find(this.selectors.errorHolderSelector).append('<div class=alert alert-danger>Error! Youtube link is invalid. </div>');
	}
	else {

		var data = {

			title : title, 
			youtubeId : youtubeId,
			desc : description

		};


		this._addSongAjaxCall(data,container);

	}
};



HomeIndex.prototype._addSongAjaxCall = function(data,container){

  $.ajax({
  url: '/songs#create',
  dataType: 'JSON',
  data: data,
  type: 'POST',
  success: $.proxy(this._addSongAjaxSuccess,this,container)

});

};

HomeIndex.prototype._addSongAjaxSuccess = function(container,data,response){

if( data != null && typeof data !== 'undefined'){

		if(data.status == true){

		if(data.youtubeId !== '' && typeof data.youtubeId !== 'undefined'){

            
			ytplayer = document.getElementById("myytplayer");
			if(ytplayer === null)
				this._initYoutubeSWF(data.youtubeId,0)
			else
		    	ytplayer.loadVideoById(data.youtubeId);

			var currentSong = $('.js-document').find('.js-currentSong');

    		currentSong.attr('data-youtubeId',data.youtubeId);
    		currentSong.attr('data-startTime','0');
    		currentSong.val(data.song_id);
		}
		container.find(this.selectors.closeModalSelector).click();


		}else{

		// daca nu a reusit sa adauge in baza de date statusul = false si feedError = false 
		// altfel statusul = false 	si feedError = true - nu a reusit sa valideze acel video in feed-ul youtube 
		

		if(data.feedError == true){

			container.find(this.selectors.errorHolderSelector).empty();
			container.find(this.selectors.errorHolderSelector).append('<div class=alert alert-danger> Your video is unavailable (has problems). </div>');


		}
		else{
			
			container.find(this.selectors.errorHolderSelector).empty();
			container.find(this.selectors.errorHolderSelector).append('<div class=alert alert-danger> Server Error ! We are sorry. </div>');

		}


		}

}
else {

	container.find(this.selectors.errorHolderSelector).empty();
	container.find(this.selectors.errorHolderSelector).append('<div class=alert alert-danger> Server Error ! We are sorry. </div>');
}

};


// prelucrare link -> returnam Id-ul sau o sa ii afisam un mesaj de eroare, rugam sa retrimita alt video ( momentan alert ) 

HomeIndex.prototype.getYoutubeId = function(link){

    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    
    var match = link.match(regExp);
    
    if (match&&match[1].length==11){

        return match[1];

    }
    else{

    	return '';
    }  
};


HomeIndex.prototype._closeModal = function(container,e){

	container.find(this.selectors.errorHolderSelector).empty();
	container.find(this.selectors.songTitleSelector).val('');
	container.find(this.selectors.youtubeLinkSelector).val('');
	container.find(this.selectors.songDescriptionSelector).val('');

};


// Action - Vote 

HomeIndex.prototype._songVoteAction = function(e){
 	e.preventDefault();
 	
 	var songId=$(e.currentTarget).data('song_id');

	$.post( "/songs/boostSong", { song_id: songId } , function(data)
		{
			var object = JSON.parse(data);
		});
};

$(document).ready(function () {
    var ctrl = new HomeIndex();    
 });



 setInterval(function(){
 		$.get("/songs/getBestFive", function(data)
		{
			var html = generateList(JSON.parse(data));
			
			$("#content_list").html(html);
		});
 		
 	},3000);


// YOUTUBE AREA ----- STAY AWAYYY

function onYouTubePlayerReady(playerId) {
		ytplayer = document.getElementById("myytplayer");
		ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
};

function onytplayerStateChange(newState) {
					  
					   
		    if(newState == 0 ){

				var currentYoutubeId = 	$('.js-bodyContainer').find('.js-currentSong').val();


				if(currentYoutubeId !== '' && typeof currentYoutubeId != 'undefined'){
				
				var data = {
					song_id : currentYoutubeId
				};

				changeSongAjaxCall(data);


				}


		     }

};



// change song when is finished - create a new SWF object with start time 0 and songId received from server - next song based on votes 

function changeSongAjaxCall(data){


console.log(data);

$.ajax({
  url: '/songs/changeSong',
  dataType: 'JSON',
  data: data,
  type: 'POST',
  success: function(data){
  	console.log(data);
  	if(data != null && typeof data != 'undefined'){

  		if(data.status != null){

			if(data.status){

			ytplayer = document.getElementById("myytplayer");
		    ytplayer.loadVideoById(data.youtubeId);

			var currentSong = $('.js-document').find('.js-currentSong');

    		currentSong.attr('data-youtubeId',data.youtubeId);
    		currentSong.attr('data-startTime','0');
    		currentSong.val(data.song_id);

			}
			else{

				if(data.error != ''){

				//var currentYTPlayer = $("#myytplayer");
				//currentYTPlayer.html('');
				//currentYTPlayer.append('<div class=alert alert-danger>'+ data.error + '. Please refresh page.'+ '</div>');

					var currentYTPlayer = $("#myytplayer");
				  	var parentcurrentYTPlayer =currentYTPlayer.parent();
					currentYTPlayer.remove();
					parentcurrentYTPlayer.prepend('<div id="ytapiplayer">No song for the moment.</div>');
				}
				
			}			

  		}
  	}

  },
  error:function(){
  	var currentYTPlayer = $("#myytplayer");
  	var parentcurrentYTPlayer =currentYTPlayer.parent();
	currentYTPlayer.remove();
	parentcurrentYTPlayer.prepend('<div id="ytapiplayer">No song for the moment.</div>');
  }

});



 };

// Helpers - generate Html Playlist

function generateList(obj)
 {
 	var html = '';

 	var x;

 	for(var i=0; i<obj.length; i++)
	 	for(var j=i+1; j<obj.length; j++)
	 		if(obj[i].UserSong.boost < obj[j].UserSong.boost)
	 			{
	 				x = obj[i];
	 				obj[i] = obj[j];
	 				obj[j] = x;
	 			}

 	for(var i=0; i<obj.length; i++)
	 	{
	 		html = html + '<li class="list-group-item"><a href="#">' + obj[i].title + '</a><a href="#" class="remove-anchor">'
	 			+ '<span class="glyphicon glyphicon-thumbs-up pull-right js-songVote" data-song_id=' + obj[i].id + '>' +
	 			+ obj[i].UserSong.boost + '</span></a></li>';
		}

	//console.log(html);
	return html;
 };