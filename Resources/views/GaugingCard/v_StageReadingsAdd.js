//create UI objects

var win = Ti.UI.currentWindow;

// create table view data object
var data = [];

var row = Ti.UI.createTableViewRow({height:50});

var lb_time = Ti.UI.createLabel({
	text:'Time:',
	color:'#999',
	textAlign:'left'
});
var tb_time = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_time);
row.add(tb_time);

data[0] = row;
row = Ti.UI.createTableViewRow({height:50});

var lb_record = Ti.UI.createLabel({
	text:'Record:',
	color:'#999',
	textAlign:'left'

});
var tb_record = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_record);
row.add(tb_record);
data[2] = row;

row = Ti.UI.createTableViewRow({height:50});

var lb_well = Ti.UI.createLabel({
	text:'Well:',
	color:'#999',
	textAlign:'left'
});
var tb_well = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_well);
row.add(tb_well);

data[3] = row;
row = Ti.UI.createTableViewRow({height:50});

var lb_gauge = Ti.UI.createLabel({
	text:'Gauge:',
	color:'#999',
	textAlign:'left'
});
var tb_gauge = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_gauge);
row.add(tb_gauge);

data[4] = row;
row = Ti.UI.createTableViewRow({height:50});

var tableView = Ti.UI.createTableView({
	data:data
});

win.add(tableView);