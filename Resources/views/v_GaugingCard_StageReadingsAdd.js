Titanium.include('../../helpers/validation.js');

//create UI objects

var win = Ti.UI.currentWindow;

// create table view data object
var data = [];

//reading add data structure
var rdata = {
		myrowid: 0,
		rtype : '', //tableView.data[0].title,
		rtypeid: '',
		datetaken : 0, // tableView.data[1].title,
		recorder : '', // tableView.data[2].title,
		epb : '', // tableView.data[3].title,
		esg : '', // tableView.data[4].title,
		diff: '' // tableView.data[5].title
		};
		
//dirty flag for edited
var edited = false;		
var editmode = false;
if (win.data) {
	editmode = true; ///flag to understand if editing.
	//set row ids where came from
	rdata.myrowid = win.myrowid;
	rdata.rtype = win.data.rtype;
	rdata.rtypeid= win.data.rtypeid;
	rdata.datetaken = win.data.datetaken;
	rdata.recorder = win.data.recorder;
	rdata.epb = win.data.epb;
	rdata.esg = win.data.esg;
	rdata.diff= win.data.diff;
	}
//set value for edited
var mytype = 'Type:*';
if(win.data)
mytype = mytype  + ' ' + win.data.rtype;

data[0] = {title:mytype,hasChild:true};

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

//set value for edited
if(win.data)
tb_time.value = win.data.datetaken;

tb_time.addEventListener('blur',function(e){
	rdata.datetaken = e.source.value;
	edited = true;
	if(e.source.isValid === false)
	displayValErr();
});

tb_time.addEventListener('change', function(e) {
	tb_time.isValid = checkValidation(tb_time);
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
//set value for edited
if(win.data)
tb_record.value = win.data.recorder;

tb_record.addEventListener('blur',function(e){
	rdata.recorder = e.source.value;
	edited = true;
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
//set value for edited
if(win.data)
tb_well.value = win.data.epb;

tb_well.addEventListener('blur',function(e){
	rdata.epb = e.source.value;
	edited = true;
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

//set value for edited
if(win.data)
tb_gauge.value = win.data.esg;

tb_gauge.addEventListener('blur',function(e){
	rdata.esg = e.source.value;
	edited = true;
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
//set value for edited
if(win.data)
tb_dif.value = win.data.diff;

tb_dif.addEventListener('blur',function(e){
	rdata.diff = e.source.value;
	edited = true;
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
	rdata.rtypeid = e.source.options[e.index].toString().charAt(0);
	rdata.rtype = e.source.options[e.index];
	edited = true;
});


		
//add event listener for going back
win.addEventListener('close',function(e)
{
		var win = Ti.UI.currentWindow;
		
	//add row to existing tableview stage readings. => raise event
	if(editmode ===false)
	Ti.App.fireEvent('add_reading',rdata);
	//edit row to existing tableview stage readings. => raise event
	if(editmode ===true)
	Ti.App.fireEvent('edit_reading',rdata);
});

win.add(tableView);
