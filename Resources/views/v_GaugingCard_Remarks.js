//create  remarks UI

var win = Titanium.UI.currentWindow;
var myform = Ti.App.model.get_currentform();

var remark = Titanium.UI.createTextArea({
	height:200,
	width:300,
	top:10,
	value: myform.readingremark,
	font: {
		fontSize:20,
		fontWeight:'bold'
	},
	verticalAlign:'top',
	textAlign:'left',
	editable:true,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	suppressReturn: false
});

remark.addEventListener('change' , function(e)
{
//save back to form value
myform.readingremark = e.value;
}
)

win.add(remark);

win.addEventListener('close', function(e) {
Ti.API.info('save form');
Ti.App.utils.saveForm(); //simple save db test
});

//only add the button if draft or new tab is open. FROM OPEN FORM DATA

//button
//iphone version

var add = Titanium.UI.createButton({
	title:'Add'
});

if (myform.details.isReadonly !== true)
if (Ti.Platform.name === 'iPhone OS') {
	add.addEventListener('click', function() {
		//open dialog
		dialog.show();
	});
	//add refresh button iOS
	if (Ti.Platform.name === 'iPhone OS') {
		win.setRightNavButton(add);
	};
}; //end if iphone
//add if android

// add android specific tests
if (myform.details.isReadonly !== true)
if (Titanium.Platform.osname === 'android') {
	Ti.API.info("creating menu option");
	var activity = Ti.Android.currentActivity;
	// Here is an example of creating the menu handlers in the window creation options.
	activity.onCreateOptionsMenu = function(e) {
		Ti.API.debug("In onCreateOptionsMenu");
		var menu = e.menu;

		var m1 = menu.add({
			title : 'Add Reading'
		});
		m1.addEventListener('click', function(e) {
			Ti.API.info("Add Reading button fired");
			//open dialog
			dialog.show();
		});
	};
};

//build data for dialog

var win = Titanium.UI.currentWindow;

var dialog;

Ti.App.utils.readLookupFiles('gaugingstdcomments.json',null,fn_buildDialog);

function fn_buildDialog(stdcomments) {

	Ti.API.info('build list data');
	///to hold list data
	var data = [];
	Ti.API.info(stdcomments.data.item.length);
	if (stdcomments.data.length !==0) {
		for (var i = stdcomments.data.item.length - 1; i >= 0; i--) {
			data.push(stdcomments.data.item[i].comment);
		};
	};

	//dialogs
	//

	dialog = Titanium.UI.createOptionDialog({
		options:data,
		//destructive:2,
		//cancel:1,
		title:'Choose ..'
	});

	// add event listener
	dialog.addEventListener('click', function(e) {
		//if value is null or blank
		if(remark.value ==='' || remark.value === null) {
			remark.value = (e.source.options[e.index]);
		} else //add to end
		{
			remark.value = remark.value + (e.source.options[e.index]);
		}
	});
};//end of function