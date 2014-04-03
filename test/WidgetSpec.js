function setup_standard(){
    //store data on the fixture
    qElem[0]._QDATA = {
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

    var _QDATA = qElem[0]._QDATA;

    //create a CheckBoxList with 2 data items and a transform function
    $("#checkThis").CheckBoxList({
        data: _QDATA.data,
        transform: _QDATA.tFunc
    });
}

function teardown_standard(){
    $("#checkThis").remove();
    delete qElem[0]._QDATA;
    qElem.append("<div id=\"checkThis\"></div>");
}


/**************
 *
 * MODULE: QUNIT VERIFICATION
 */

var qElem = $("#qunit-fixture");
module("qunit Init");
test( "Does qunit work", function(){
	ok(true);
});


/**************
 *
 * MODULE: CONSTRUCTION
 */

module("_create", {
	setup: function(){
		setup_standard();
	},
	teardown: function(){
		teardown_standard();
	}
});
test("It should create a .item for each data item", function(){
	var numItems = $(".item", "#checkThis").length;
	equal(numItems, 2, "Expecting 2 .item elements");
});
test("An .item should have a check box", function(){
	var someItem = $(".item:first", "#checkThis");
	var numBoxes = someItem.find("input[type=checkbox]").length;
	equal(numBoxes, 1, "Expecting a single checkbox");
});
test("An .item should have a span with class '.label'", function(){
	var someItem = $(".item:first", "#checkThis");
	var numLabels = someItem.find("span.label").length;
	equal(numLabels, 1, "Expecting a single span.label");
});
test("An .item should have an attr reference to its data index", function(){
	var someItem = $(".item:first", "#checkThis");
	equal(someItem.attr("data-index"), "0", "Expecting the first .item to point to the 0 index");
});
test("An .item (from object) should have a label matching its display data as determined by the transform function", function(){
	//grab the stored data
	var _QDATA = $("#qunit-fixture")[0]._QDATA;
	//grab the auto and manually created labels
	var itemLabel = $(".item:first .label", "#checkThis").html();
	var tFuncLabel = _QDATA.tFunc(_QDATA.data[0]);
	//compare
	equal(itemLabel, tFuncLabel, "Expecting the manually transformed data to match the created label");
});
test("An .item (from primitive) should have a label matching its display data as determined by the transform function", function(){
	//gotta create a different CheckBoxList for this one using an array of primitives
	$("#qunit-fixture").append("<div id=\"checkTwo\"></div>");
	var data = ["Test", "Test2"];
	$("#checkTwo").CheckBoxList({data: data});

	var itemLabel = $(".item:first .label", "#checkTwo").html();
	var tFuncLabel = data[0];
	equal(itemLabel, tFuncLabel, "Expecting the primitive data to match the created label");
});


/**************
 *
 * MODULE: CHECKBOX SELECTION
 */

module("Selection Events", {
    setup: function(){
        setup_standard();
    },
    teardown: function(){
        teardown_standard();
    }
});

asyncTest("The CheckBoxList should emit a CheckBoxChanged event when changed by any type of interaction", function(){
    stop();
    expect(2);
    var myCBList = $("#checkThis"),
        asserts = 0;

    //add an event listener for 'CheckBoxChanged'
    myCBList.bind("CheckBoxChanged", function(e){
        //we don't care what's in the event for this test
        ok(true, "Got an event of type "+ e.type);
        start();
        asserts++;
    });

    //change the checked attribute. This should NOT fire the change event
    var myBox = myCBList.find("input[type=checkbox]:first");
    if( myBox.attr("checked") === "checked"  ){
        myBox.attr("checked", "");
    }
    else {
        myBox.attr("checked","checked");
    }

    //manually trigger the change handler
    myBox.triggerHandler("change");

    //trigger a click event on a checkbox
    myBox.trigger("click");

    //allow 2 seconds for tests to complete
    setTimeout( function(){
        if( asserts < 2 ){
            start(2-asserts);
        }
    }, 2000);
});