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
	saveModalSelector : '.js-saveForm'

};

HomeIndex.prototype._addDelegates = function(){

$(this.selectors.listSelector).find(this.selectors.listItemSelector).on('click', $.proxy(this._preventDefaultListItem,this));

};

HomeIndex.prototype._preventDefaultListItem = function(e){
// nu mai crapa, turbolinks 	
e.preventDefault();

};

$(document).ready(function () {
    var ctrl = new HomeIndex();


    

 });

