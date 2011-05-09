//create UI objects

var win = Ti.UI.currentWindow;

// create table view data object
var data = [];

data[0] = {title:'Type:',hasChild:true};

var row = Ti.UI.createTableViewRow({height:50});

var lb_time = Ti.UI.createLabel({
	text:'Time:*',
	color:'#999',
	textAlign:'left'
});
var tb_time = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    validation:{ isdouble:false, isinteger:true, range:{min:0,max:2199},minchars:3,maxchars:4,reqd:true },
    keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_time);
row.add(tb_time);

data[1] = row;
row = Ti.UI.createTableViewRow({height:50});

var lb_record = Ti.UI.createLabel({
	text:'Recorder:(m)',
	color:'#999',
	textAlign:'left'

});
var tb_record = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
    validation:{ isdouble:true, isinteger:false, range:{min:0,max:99},minchars:3,maxchars:6,reqd:false },
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_record);
row.add(tb_record);
data[2] = row;

row = Ti.UI.createTableViewRow({height:50});

var lb_well = Ti.UI.createLabel({
	text:'Well:(m)',
	color:'#999',
	textAlign:'left'
});
var tb_well = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
    validation:{ isdouble:true, isinteger:false, range:{min:0,max:99},minchars:3,maxchars:6,reqd:false },
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_well);
row.add(tb_well);

data[3] = row;
row = Ti.UI.createTableViewRow({height:50});

var lb_gauge = Ti.UI.createLabel({
	text:'Gauge:(m)',
	color:'#999',
	textAlign:'left'
});
var tb_gauge = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
    validation:{ isdouble:true, isinteger:false, range:{min:0,max:99},minchars:3,maxchars:6,reqd:false },
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_gauge);
row.add(tb_gauge);

data[4] = row;
row = Ti.UI.createTableViewRow({height:50});

var lb_dif = Ti.UI.createLabel({
	text:'+/-:(mm)',
	color:'#999',
	textAlign:'left'
});
var tb_dif = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
    validation:{ isdouble:true, isinteger:false, range:{min:0,max:99},minchars:3,maxchars:6,reqd:false },
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_dif);
row.add(tb_dif);

data[5] = row;

var tableView = Ti.UI.createTableView({
	data:data
});

tableView.addEventListener('click', function(e){
	Titanium.API.info(e.index);
	if(e.index ===0) //only show if first row.
		dialog.show();
})


win.add(tableView);

//
// BASIC DIALOG
//
var dialog = Titanium.UI.createOptionDialog({
	options:['Inspection', 'Start Measurement', 'End Measurement'],
	//destructive:2,
	//cancel:1,
	title:'Choose type ..'
});

// add event listener
dialog.addEventListener('click',function(e)
{
	Titanium.API.info(e.source.options[e.index]);
	tableView.updateRow(0,{title:'Type: ' + e.source.options[e.index] },{animated:true});
});
