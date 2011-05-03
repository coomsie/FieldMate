Titanium.include('../../helpers/validation.js');

//create UI objects

var win = Ti.UI.currentWindow;

// create table view data object
var data = [];

data[0] = {
	title:'Type:*',
	hasChild:true,
	url:'/views/GaugingCard/v_FieldDataMeters.js',
	header:'Meter'
};

var row = Ti.UI.createTableViewRow({
	height:50
});
row = Ti.UI.createTableViewRow({
	height:50,
	header:'Spin test (secs)'
});

var lb_meter_before = Ti.UI.createLabel({
	text:'Before:*',
	color:'#999',
	textAlign:'left'
});
var tb_meter_before = Titanium.UI.createTextField({
	color:'#999',
	height:35,
	left:100,
	width:220,
	keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	validation:{ integer:true, range:{min:10,max:100},min:3,max:3 },
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

tb_meter_before.addEventListener('change', function(e) {
	Titanium.API.info(isValidNumber(e.source.value));
	Titanium.API.info('here');
	Titanium.API.info(e.source.value.toString().length);
	Titanium.API.info(e.source.value);
	checkValidation(tb_meter_before);
	//if(!isInteger(e.source.value))
	//e.source.value = removeLastEntry(e.source.value);
});

row.add(lb_meter_before);

row.add(tb_meter_before);

data[1] = row;
row = Ti.UI.createTableViewRow({
	height:50
});

var lb_meter_after = Ti.UI.createLabel({
	text:'After:*',
	color:'#999',
	textAlign:'left'

});
var tb_meter_after = Titanium.UI.createTextField({
	color:'#999',
	height:35,
	left:100,
	width:220,
	keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_meter_after);
row.add(tb_meter_after);
data[3] = row;

data[4] = {
	title:'From:*',
	hasChild:true,
	url:'/views/GaugingCard/v_FieldDataMeasured.js',
	header:'Measured (m)'
};

row = Ti.UI.createTableViewRow({
	height:50
});

var lb_measured_below = Ti.UI.createLabel({
	text:'Below:*',
	color:'#999',
	textAlign:'left'
});
var tb_measured_below = Titanium.UI.createTextField({
	color:'#999',
	height:35,
	left:100,
	width:220,
	keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_measured_below);
row.add(tb_measured_below);

data[5] = row;
row = Ti.UI.createTableViewRow({
	height:50
});

var lb_measured_above = Ti.UI.createLabel({
	text:'Above:*',
	color:'#999',
	textAlign:'left'

});
var tb_measured_above = Titanium.UI.createTextField({
	color:'#999',
	height:35,
	left:100,
	width:220,
	keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_measured_above);
row.add(tb_measured_above);
data[6] = row;

row = Ti.UI.createTableViewRow({
	height:50
});

var lb_wind = Ti.UI.createLabel({
	text:'Wind (km/h):*',
	color:'#999',
	textAlign:'left'

});
var tb_wind = Titanium.UI.createTextField({
	color:'#999',
	height:35,
	left:100,
	width:220,
	keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_wind);
row.add(tb_wind);
data[7] = row;

data[8] = {
	title:'Type:*',
	hasChild:true,
	header:'Angle',
	dialogid:'AngleType',
	origtitle: 'Type: ',
	dialogoptions : ['variable','nil','constant']
};

row = Ti.UI.createTableViewRow({
	height:50
});

var lb_current = Ti.UI.createLabel({
	text:'Current:*',
	color:'#999',
	textAlign:'left'

});
var tb_current = Titanium.UI.createTextField({
	color:'#999',
	height:35,
	left:100,
	width:220,
	keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_current);
row.add(tb_current);
data[9] = row;

data[10] = {
	title:'Colour:*',
	hasChild:false,
	header:'Water',
	dialogid:'WaterColour',
	origtitle: 'Colour: ',
	dialogoptions : ['discoloured','clear','?other?']
};

row = Ti.UI.createTableViewRow({
	height:50
});

var lb_temp = Ti.UI.createLabel({
	text:'Temp:*',
	color:'#999',
	textAlign:'left'

});
var tb_temp = Titanium.UI.createTextField({
	color:'#999',
	height:35,
	left:100,
	width:220,
	keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_temp);
row.add(tb_temp);
data[11] = row;

var tableView = Ti.UI.createTableView({
	data:data
});

tableView.addEventListener('click', function(e) {
	// dialogs
	if (e.rowData.dialogid) //exists
	{
		//Ti.API.info(e.rowData.title);
		dialog.rowid = e.index;
		dialog.options = e.rowData.dialogoptions;
		dialog.origtitle  = e.rowData.origtitle;
		dialog.dialogid = e.rowData.dialogid;
		dialog.show();

	}

	if (e.rowData.url) {
		var win = null;
		if (Ti.Platform.name == "android") {
			win = Titanium.UI.createWindow({
				url:e.rowData.url,
				title:e.rowData.title
			});
		} else {
			win = Titanium.UI.createWindow({
				url:e.rowData.url,
				title:e.rowData.title,
				backgroundColor:'#fff',
				barColor:'#1A75A2'
			});
		}
		Titanium.UI.currentTab.open(win, {
			animated:true
		});
	}
});
win.add(tableView);

Ti.App.addEventListener('change_fielddata', function(e) {
	tableView.updateRow(e.rowid , {
		title: e.title,
		hasChild:e.hasChild,
		url:e.url
	}, {
		animated:true
	});
	if (e.title ==='Type: Flowtracker' || e.title ==='Type: ADCP') {
		tableView.updateRow(1, {
			title:'n/a'
		}, {
			animated:true
		});
		tableView.updateRow(2, {
			title:'n/a'
		}, {
			animated:true
		});
	}
});

//dialogs
//

var dialog = Titanium.UI.createOptionDialog({
	options:['other'],
	//destructive:2,
	//cancel:1,
	title:'Choose ..',
	rowid: null,
	origtitle: null,
	dialogid: null
});

// add event listener
dialog.addEventListener('click', function(e) {
	//Titanium.API.info(e.source.options[e.index]);
	//Titanium.API.info(dialog.rowid);
	//Titanium.API.info(e);
	tableView.updateRow(dialog.rowid, {
		title: dialog.origtitle + e.source.options[e.index],
		hasChild:true,
		dialogid: dialog.dialogid ,
		origtitle: dialog.origtitle ,
		dialogoptions: e.source.options
	});
});

