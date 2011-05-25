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
	text:'Recorder(m):',
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
	text:'EPB(m):',
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
	text:'ESG(m):',
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
	text:'+/-(mm):',
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

var mytitle = 'Measured';

//add event listener for going back
win.addEventListener('close',function(e)
{
		var win = Ti.UI.currentWindow;
		var rdata = {
		rtype : 'M', //tableView.data[0].title,
		datetaken : '1100', // tableView.data[1].title,
		recorder : '1.76', // tableView.data[2].title,
		epb : '1.73', // tableView.data[3].title,
		esg : '1.74', // tableView.data[4].title,
		diff: '2' // tableView.data[5].title
		};
	//add row to existing tableview stage readings. => raise event
	Ti.App.fireEvent('add_reading',rdata);
});



win.add(tableView);


//UI FOR  EVENT 
// 
// // create the rest of the rows
// for (var c=0;c<8;c++)
// {
	// var row = Ti.UI.createTableViewRow();
	// row.height  =38;
	// row.myid = c;
// 	
	// var ty =  mylb('M',20,5);
	// var t =  mylb('1300',53,30);
	// var r =  mylb('0.7330',53,100);
	// var epb =  mylb('0.7500',53,160);
	// var esg =  mylb('0.7500',53,225);
	// var d =  mylb('15',20,295);
// 	
	// ty.rowNum = c;
	// t.rowNum = c;
	// r.rowNum = c;
	// epb.rowNum = c;
	// esg.rowNum = c;
	// d.rowNum = c;
	// row.add(ty);
	// row.add(t);
	// row.add(r);
	// row.add(epb);
	// row.add(esg);
	// row.add(d);
	// data.push(row);
// }

