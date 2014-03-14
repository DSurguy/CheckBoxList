/*
	CheckBoxList jQuery Widget
*/
(function($){

	$.widget( "Surge.CheckBoxList", {
		options: {
			data: [],
			displayData: [],
			transform: undefined,
			header: ""
		},

		_create: function() {
			//Create the display data if it doesn't exist
			if( this.options.displayData.length == 0){
				var tFunc = this.options.transform;
				if( !tFunc ){
					tFunc = function(item){ return item.toString(); };
				}
				for( var i=0; i<this.options.data.length; i++ ){
					this.options.displayData[i] = tFunc(this.options.data[i]);
				}
			}
		},

		select: function(index) {
			console.log("Selecting Index: "+index);
		}
	});

})(jQuery);