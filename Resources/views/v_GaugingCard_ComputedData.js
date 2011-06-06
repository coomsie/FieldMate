Titanium.include('../../helpers/validation.js');

var valMessages = new validationMessages();

//create UI objects

var win = Ti.UI.currentWindow;

//FORM VALUES BELOW
	// computeddischarge : null,
	// computedarea : null,
	// computedmeanvel : null,
	
//only add the button if draft or new tab is open. FROM OPEN FORM DATA
myform = Ti.App.model.get_currentform();
var isEnabled = (myform.details.isReadonly !== true) ? true : false;

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
	enabled: isEnabled,
	value: myform.computeddischarge,
	isValid: '',
	keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
	validation:{ isdouble:true, isinteger:false, range:{min:0,max:100},minchars:1,maxchars:3,reqd:false },
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

tb_discharge.addEventListener('blur',function(e){
	if(e.source.isValid === false)
	{
	Ti.API.debug('show validation message');
	valMessages.displayValErr();
	}
	else
	{
		myform.computeddischarge = e.source.value;
	}
});

tb_discharge.addEventListener('change', function(e) {
	tb_discharge.isValid = checkValidation(tb_discharge);
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
	enabled: isEnabled,
	value: myform.computedarea,
	isValid: '',
	validation:{ isdouble:true, isinteger:false, range:{min:0,max:100},minchars:1,maxchars:3,reqd:false },
	keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

tb_area.addEventListener('blur',function(e){
	if(e.source.isValid === false)
	{
	Ti.API.debug('show validation message');
	valMessages.displayValErr();
	}
	else
	{
		myform.computedarea = e.source.value;
	}
});

tb_area.addEventListener('change', function(e) {
	tb_area.isValid = checkValidation(tb_area);
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
	enabled: isEnabled,
	value: myform.computedmeanvel,
	isValid: '',
	validation:{ isdouble:true, isinteger:false, range:{min:0,max:100},minchars:1,maxchars:3,reqd:false },
	keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

tb_meanvel.addEventListener('blur',function(e){
	if(e.source.isValid === false)
	{
	Ti.API.debug('show validation message');
	valMessages.displayValErr();
	}
	else
	{
		myform.computedmeanvel = e.source.value;
	}
});

tb_meanvel.addEventListener('change', function(e) {
	tb_meanvel.isValid = checkValidation(tb_meanvel);
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


win.addEventListener('close', function(e) {
//Ti.API.info('save form');
if (myform.details.isReadonly !== true)
Ti.App.utils.saveForm(); //simple save db test
});