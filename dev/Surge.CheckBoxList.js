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
            //initialize private/public variables
            this._initData();

            var tFunc = this.options.transform,
                _this = this;

			//Create the display data
			if( !tFunc ){
				tFunc = function(item){ return item.toString(); };
			}
			for( var i=0; i<this.options.data.length; i++ ){
				this._displayData[i] = tFunc(this.options.data[i]);
			}

			//create the html for the checkbox list
			for( i=0; i<this.options.data.length; i++ ){
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

            //add an event listener that listens for changes on the input elements
            this.element.on("change", "input[type=checkbox]", function (e) {
                _this._handleChange($(this), e);
            });
		},

        _initData: function(){
            this._displayData = [];
        },


		_handleChange: function(jElem, event){
            //create a new CheckBoxChanged event
            var changeEvent = $.Event("CheckBoxChanged", {
/*                //include the original event
                e: event,
                //include the index of the element that was clicked
                elemIndex: parseInt($(elem).attr("data-index"),10),
                //determine the display index of this element*/
            });

            this.element.trigger(changeEvent);
        }
	});

})(jQuery);

