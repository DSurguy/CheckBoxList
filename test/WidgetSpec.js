module("qunit Init");
test( "Does qunit work", function(){
	ok(true);
});


module("_create", {
	setup: function(){
		//create a CheckBoxList with 2 data items
		$("#checkThis").CheckBoxList([{
			thing: "WORDS",
			otherThing: 24
		}, {
			thing: "WORDS",
			otherThing: 24
		}]);	
	},
	teardown: function(){

	}
});
test("It should create a .item for each data item", function(){
	var numItems = $("#checkThis .item").length;
	equal(numItems, 2, "Expecting 2 .item elements");
});
test("An .item should have a check box", function(){
	var someItem = $("#checkThis .item:first");
	var numBoxes = someItem.find("input[type=checkbox]").length;
	equal(numBoxes, 1, "Expecting a single checkbox");
});
test("An .item should have a span with class '.label'", function(){
	var someItem = $("#checkThis .item:first");
	var numLabels = someItem.find("span.label").length;
	equal(numLabels, 1, "Expecting a single span.label");
});
test("An .item should have an attr reference to its data index", function(){
	var someItem = $("#checkThis .item:first");
	equal(someItem.attr("data-index"), "0", "Expecting the first .item to point to the 0 index");
});
