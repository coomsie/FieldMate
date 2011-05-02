//create UI objects

var win = Ti.UI.currentWindow;

// create table view data object
var data = [];

var row = Ti.UI.createTableViewRow({
	height:50
});

var lb_discharge = Ti.UI.createLabel({
	text:'Discharge(m3/s):',
	color:'#999',
	textAlign:'left'
});
var tb_discharge = Titanium.UI.createTextField({
	color:'#999',
	height:35,
	right:0,
	width:150,
	keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_discharge);
row.add(tb_discharge);

data[0] = row;
row = Ti.UI.createTableViewRow({
	height:50
});

var lb_area = Ti.UI.createLabel({
	text:'Area(m2):',
	color:'#999',
	textAlign:'left'

});
var tb_area = Titanium.UI.createTextField({
	color:'#999',
	height:35,
	right:0,
	width:150,
	keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_area);
row.add(tb_area);
data[2] = row;

row = Ti.UI.createTableViewRow({
	height:50
});

var lb_meanvel = Ti.UI.createLabel({
	text:'Mean vel(m/s):',
	color:'#999',
	textAlign:'left'
});
var tb_meanvel = Titanium.UI.createTextField({
	color:'#999',
	height:35,
	right:0,
	width:150,
	keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_meanvel);
row.add(tb_meanvel);

data[3] = row;
row = Ti.UI.createTableViewRow({
	height:50
});

var tableView = Ti.UI.createTableView({
	data:data
});

win.add(tableView);