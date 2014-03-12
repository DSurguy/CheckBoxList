/*
	CheckBoxList jQuery Widget
*/
(function($){

	$.widget( "Surge.CheckBoxList", {
		options: {
			data: []
		},

		_create: function() {
			console.log(this.options.data);
		}
	});

})(jQuery);