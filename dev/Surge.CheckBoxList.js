/*
	CheckBoxList jQuery Widget
*/
(function($){

	$.widget( "Surge.CheckBoxList", {
		options: {
			data: [],
			transform: undefined,
			header: ""
		},

		_create: function() {
			//Create the display data
			this._displayData = [];
			var tFunc = this.options.transform;
			if( !tFunc ){
				tFunc = function(item){ return item.toString(); };
			}
			for( var i=0; i<this.options.data.length; i++ ){
				this._displayData[i] = tFunc(this.options.data[i]);
			}

			//create the html for the checkbox list
			for( var i=0; i<this.options.data.length; i++ ){
				//create the checklist item
				var newItem = $("<div class=\"item\"></div>");
				//set the attribute to the data index
				newItem.attr("data-index", i);
				//add the label from the displayData
				newItem.append("<span class=\"label\">"+this._displayData[i]+"</span>");
				//add the checkbox
				newItem.append("<input type=\"checkbox\" />");
				//add this to the DOM
				this.element.append(newItem);
			}
		},

		select: function(index) {
			console.log("Selecting Index: "+index);
		}
	});

})(jQuery);