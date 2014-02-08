var HomeIndex = function () {
        this._initHome();


};

HomeIndex.prototype._initHome = function(){
    this._addDelegates();
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
 	anchorRemoveSelector : '.remove-anchor'

};

HomeIndex.prototype._addDelegates = function(){

$(this.selectors.listSelector).find(this.selectors.listItemSelector).on('click', $.proxy(this._preventDefaultListItem,this));


$(this.selectors.documentSelector).find(this.selectors.anchorRemoveSelector).on('click', $.proxy(this._preventDefaultListItem,this));
// modal stuff

var $modalContainer = $(this.selectors.modalSelector);

$modalContainer.find(this.selectors.saveModalSelector).on('click', $.proxy(this._addSong,this,$modalContainer));

$modalContainer.find(this.selectors.closeModalSelector).on('click', $.proxy(this._closeModal,this,$modalContainer));

// vote stuff 

$(this.selectors.listSelector).find(this.selectors.songVoteSelector).on('click', $.proxy(this._songVoteAction,this));

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


		this._addSongAjaxCall(data);

	}
};



HomeIndex.prototype._addSongAjaxCall = function(data){

  $.ajax({
  url: '/songs#create',
  dataType: 'JSON',
  data: data,
  type: 'POST',
  success: $.proxy(this._addSongAjaxSuccess,this)

});

};

HomeIndex.prototype._addSongAjaxSuccess = function(data,response){

if( data != null && typeof data !== 'undefined'){

		if(data.status = true){

		console.log('Treaba Buna');


		}else{

		console.log('Treaba Nasoala');
		

		}

}
else {

	console.log('EROARE SERVER!')
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
			console.log(object);
		});
};



$(document).ready(function () {
    var ctrl = new HomeIndex();    
 });