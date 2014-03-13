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
			console.log(this.options.data);
		},



		select: function(index) {
			console.log("Selecting Index: "+index);
		}
	});

})(jQuery);