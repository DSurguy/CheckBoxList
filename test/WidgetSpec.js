module("qunit Init");
test( "Does qunit work", function(){
	ok(true);
});

module("_create", {
	setup: function(){

		//store data on the fixture
		$("#qunit-fixture")[0]._QDATA = {
			tFunc: function(item){
				return item.thing;
			},
			data: [{
				thing: "WORDS",
				otherThing: 24
			}, {
				thing: "WORDS ALSO",
				otherThing: 24
			}]
		};

		var _QDATA = $("#qunit-fixture")[0]._QDATA;

		//create a CheckBoxList with 2 data items and a transform function
		$("#checkThis").CheckBoxList({
			data: _QDATA.data,
			transform: _QDATA.tFunc
		});	
	},
	teardown: function(){
		$("#checkThis").remove();
		delete $("#qunit-fixture")[0]._QDATA;
		$("#qunit-fixture").append("<div id=\"checkThis\"></div>");
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
test("An .item (from object) should have a label matching its display data as determined by the transform function", function(){
	//grab the stored data
	var _QDATA = $("#qunit-fixture")[0]._QDATA;
	//grab the auto and manually created labels
	var itemLabel = $("#checkThis .item:first .label").html();
	var tFuncLabel = _QDATA.tFunc(_QDATA.data[0]);
	//compare
	equal(itemLabel, tFuncLabel, "Expecting the manually transformed data to match the created label");
});
test("An .item (from primitive) should have a label matching its display data as determined by the transform function", function(){
	//gotta create a different CheckBoxList for this one using an array of primitives
	$("#qunit-fixture").append("<div id=\"checkTwo\"></div>");
	var data = ["Test", "Test2"];
	$("#checkTwo").CheckBoxList({data: data});

	var itemLabel = $("#checkTwo .item:first .label").html();
	var tFuncLabel = data[0];
	equal(itemLabel, tFuncLabel, "Expecting the primitive data to match the created label");
});