Titanium.include('/helpers/validation.js');

// form data model
var myform = Ti.App.model.get_currentform();
//new validation and load with rules for form
setValidationRules(myform.details.rules);

var valMessages = new validationMessages();

//create UI objects

var win = Ti.UI.currentWindow;

//FORM VALUES BELOW
	// computeddischarge : null,
	// computedarea : null,
	// computedmeanvel : null,
	
//only add the button if draft or new tab is open. FROM OPEN FORM DATA
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
	id: 'computeddischarge',
	color:'#999',
	height:35,
	right:0,
	width:150,
	enabled: isEnabled,
	value: myform.computeddischarge,
	keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	isValid: null,
	errMsg:'',
	validation:''
});

tb_discharge.addEventListener('blur',function(e){
	if(e.source.isValid === false)
	{
	Ti.API.debug('show validation message');
	valMessages.displayValErr(e.source.errMsg);
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
	id : 'computedarea',
	color:'#999',
	height:35,
	right:0,
	width:150,
	enabled: isEnabled,
	value: myform.computedarea,
	keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	isValid: null,
	errMsg:'',
	validation:''
});

tb_area.addEventListener('blur',function(e){
	if(e.source.isValid === false)
	{
	Ti.API.debug('show validation message');
	valMessages.displayValErr(e.source.errMsg);
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
	id : 'computedmeanvel',
	color:'#999',
	height:35,
	right:0,
	width:150,
	enabled: isEnabled,
	value: myform.computedmeanvel,
	keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	isValid: null,
	errMsg:'',
	validation:''
});

tb_meanvel.addEventListener('blur',function(e){
	if(e.source.isValid === false)
	{
	Ti.API.debug('show validation message');
	valMessages.displayValErr(e.source.errMsg);
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