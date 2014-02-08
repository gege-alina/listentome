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
	errorHolderSelector : '.js-errorHolder'

};

HomeIndex.prototype._addDelegates = function(){

$(this.selectors.listSelector).find(this.selectors.listItemSelector).on('click', $.proxy(this._preventDefaultListItem,this));

var $modalContainer = $(this.selectors.modalSelector);

$modalContainer.find(this.selectors.saveModalSelector).on('click', $.proxy(this._addSong,this,$modalContainer));

$modalContainer.find(this.selectors.closeModalSelector).on('click', $.proxy(this._closeModal,this,$modalContainer));

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


	var youtubeId = this.getYoutubeId(youtubeLink);


	// va trebui modificat ( chestie vizuala, append un warning )
	if(youtubeId === ''){

		container.find(this.selectors.errorHolderSelector).append('<div class=alert alert-danger>Error! Youtube link is invalid. </div>');
	}
	else {

		var data = {

			title : title, 
			youtubeId : youtubeId

		};


		this._addSongAjaxCall(data);

	}
};



HomeIndex.prototype._addSongAjaxCall = function(data){


	console.log('Titlu: ' + data.title);
	console.log('Id: ' + data.youtubeId);

  $.ajax({
  url: "/search/get_listing?listing_id" + id,
  dataType: 'JSON',
  success: function(data) {
    var listing = JSON.parse(data);
    $("#modalPrice").html(data.city);
  }
});

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


$(document).ready(function () {
    var ctrl = new HomeIndex();    

 });


HomeIndex.prototype._closeModal = function(container,e){

	container.find(this.selectors.errorHolderSelector).empty();
	container.find(this.selectors.songTitleSelector).val('');
	container.find(this.selectors.youtubeLinkSelector).val('');

};