Titanium.include('../../helpers/validation.js');

// form data model
var myform = Ti.App.model.get_currentform();
//new validation and load with rules for form
setValidationRules(myform.details.rules);

var valMessages = new validationMessages();

valMessages.reqdfieldsRemaining=2;
//create UI objects

var win = Ti.UI.currentWindow;

//hide till all values are completed.
//win.hideNavBar();

var leftNav = Titanium.UI.createButton({
	title:'Input Error',
	height:40,
	width:145,
	top:160,
	left:10,
	enabled:false
});

// create table view data object
var data = [];
var mytype = 'Type:*';

//reading add data structure
var rdata = {
		myrowid: 0,
		typedesc : '', //tableView.data[0].title,
		typeid: null,
		timetaken : 0, // tableView.data[1].title,
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
	rdata.typedesc = win.data.typedesc;
	rdata.typeid= win.data.typeid;
	rdata.timetaken = win.data.timetaken;
	rdata.recorder = win.data.recorder;
	rdata.epb = win.data.epb;
	rdata.esg = win.data.esg;
	rdata.diff= win.data.diff;

	//set value for edited
	mytype = mytype  + ' ' + win.data.typedesc;
	}
	else
	{
		win.leftNavButton = leftNav;
	}

data[0] = {
			title: mytype,
			hasChild:true , 
	 		validation:{ reqd:true },
	 		isValid : false,
	 		value: null
	 		};

var row = Ti.UI.createTableViewRow({height:50});

var lb_time = Ti.UI.createLabel({
	text:'Time:*',
	color:'#999',
	textAlign:'left'
});
var tb_time = Titanium.UI.createTextField({
	id: 'stagereadingstimetaken',
    color:'#999',
    height:35,
    left:100,
    width:220,
    value: '',
    keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    isValid: null,
	errMsg:'',
	validation:''
});

//set value for edited
if(win.data)
tb_time.value = win.data.timetaken;

tb_time.addEventListener('blur',function(e){
	if(e.source.isValid === false)
	{
	Ti.API.debug('show validation message');
	valMessages.displayValErr(e.source.errMsg);
	}else
	{
	rdata.timetaken = e.source.value;
	edited = true;
	}
	checkforallValErrs();
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
	id:  'stagereadingsrecord',
    color:'#999',
    height:35,
    left:100,
    width:220,
    keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    isValid: null,
	errMsg:'',
	validation:''
});
//set value for edited
if(win.data)
tb_record.value = win.data.recorder;

tb_record.addEventListener('blur',function(e){
	if(e.source.isValid === false)
	{
	Ti.API.debug('show validation message');
	valMessages.displayValErr(e.source.errMsg);
	}else
	{
	rdata.recorder = e.source.value;
	edited = true;	
	}
	checkforallValErrs();
});

tb_record.addEventListener('change',function(e){
	tb_record.isValid = checkValidation(tb_record);
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
	id:  'stagereadingswell',
    color:'#999',
    height:35,
    left:100,
    width:220,
    keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    isValid: null,
	errMsg:'',
	validation:''
});
//set value for edited
if(win.data)
tb_well.value = win.data.epb;

tb_well.addEventListener('blur',function(e){
	if(e.source.isValid === false)
	{
	Ti.API.debug('show validation message');
	valMessages.displayValErr(e.source.errMsg);
	}else
	{
	rdata.epb = e.source.value;
	edited = true;
	}
	checkforallValErrs();
});

tb_well.addEventListener('change',function(e){
	tb_well.isValid = checkValidation(tb_well);
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
	id:  'stagereadingsgauge',
    color:'#999',
    height:35,
    left:100,
    width:220,
    keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    isValid: null,
	errMsg:'',
	validation:''
});

//set value for edited
if(win.data)
tb_gauge.value = win.data.esg;

tb_gauge.addEventListener('blur',function(e){
	if(e.source.isValid === false)
	{
	Ti.API.debug('show validation message');
	valMessages.displayValErr(e.source.errMsg);
	}else
	{
	rdata.esg = e.source.value;
	edited = true;	
	}
	checkforallValErrs();
});

tb_gauge.addEventListener('change',function(e){
	tb_gauge.isValid = checkValidation(tb_gauge);
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
	id:  'stagereadingsdif',
    color:'#999',
    height:35,
    left:100,
    width:220,
    keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    isValid: null,
	errMsg:'',
	validation:''
});
//set value for edited
if(win.data)
tb_dif.value = win.data.diff;

tb_dif.addEventListener('blur',function(e){
	if(e.source.isValid === false)
	{
	Ti.API.debug('show validation message');
	valMessages.displayValErr(e.source.errMsg);
	}else
	{
	rdata.diff = e.source.value;
	edited = true;
	}
	diffValidation();
});

tb_dif.addEventListener('change',function(e){
	tb_dif.isValid = checkValidation(tb_dif);
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
	{
		dialog.show();
		checkforallValErrs();
	}
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
	//if (rdata.typeid = null) //first time fired
	valMessages.reqdfieldsRemaining=valMessages.reqdfieldsRemaining - 1;
	
	Titanium.API.info(e.source.options[e.index]);
	tableView.updateRow(0,{title:'Type: ' + e.source.options[e.index] , typeid: e.index ,validation:{ reqd:true },isValid : false },{animated:true});
	rdata.typeid = e.source.options[e.index].toString().charAt(0);
	rdata.typedesc = e.source.options[e.index];
	edited = true;
});


		
//add event listener for going back
win.addEventListener('close',function(e)
{
	//check validation
	Ti.API.info('run dropdown valdation');
	
	var win = Ti.UI.currentWindow;	
	//add row to existing tableview stage readings. => raise event
	if(editmode ===false)
	Ti.App.fireEvent('add_reading',rdata);
	//edit row to existing tableview stage readings. => raise event
	if(editmode ===true)
	Ti.App.fireEvent('edit_reading',rdata);
});

win.add(tableView);

function checkforallValErrs()
{
	Ti.API.debug('remain' + valMessages.reqdfieldsRemaining);
	Ti.API.debug('errors' + valMessages.totalErrors);
	//if (valMessages.reqdfieldsRemaining === 0 && valMessages.totalErrors ===0)
	win.leftNavButton = null;
}

function diffValidation()
{
	var d = Math.round(Math.abs(rdata.recorder - rdata.epb)*1000) ;
	if ((rdata.diff) - d !== 0)
	alert('Note: Difference is not correct. (Should be .. ' + d + ')');
	
	Ti.API.debug('diff' + Math.round(Math.abs(rdata.recorder - rdata.epb)*1000));
}
