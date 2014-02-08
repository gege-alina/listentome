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
 	songVoteSelector : '.js-songVote'
};

HomeIndex.prototype._addDelegates = function(){

$(this.selectors.listSelector).find(this.selectors.listItemSelector).on('click', $.proxy(this._preventDefaultListItem,this));
$(this.selectors.listSelector).find(this.selectors.songVoteSelector).on('click', $.proxy(this._songVoteAction,this));
};

HomeIndex.prototype._preventDefaultListItem = function(e){
// nu mai crapa, turbolinks 	
e.preventDefault();

};

HomeIndex.prototype._songVoteAction = function(e){
 	e.preventDefault();
 	
 	var songId=$(e.currentTarget).data('song_id');
 	var ajaxUrl = '/songs#boostSong/' + songId;
		$.ajax({
	    url: ajaxUrl,
	    success: function(data)
        {
          console.log(data)
        }
	});
 };

$(document).ready(function () {
    var ctrl = new HomeIndex();

 });

