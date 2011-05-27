Titanium.include('../../helpers/validation.js');

//create UI objects

var win = Ti.UI.currentWindow;

var tableView;

// create keyboard done button hack
	// Flexible Space for Button bars
var flexSpace = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

//Done System Button
var btn_done = Titanium.UI.createButton({
    //systemButton:Titanium.UI.iPhone.SystemButton.ACTION
    title:"Hide"
});

// Creating the Keyboard Toobar
var keyboardToolbar = Titanium.UI.createToolbar({
    items:[flexSpace,btn_done],
    bottom:210,
    borderTop:true,
    borderBottom:true,
    visible:false,
    opacity:0,
    barColor:'#1A75A2'
});
win.add(keyboardToolbar);

// ==============================
// = KEYBOARD TOOLBAR ANIMATION =
// ==============================
 
function showKeyboardToobar() {
    Ti.API.info("showKeyboardToobar Function Called")
 
    keyboarToolbarAnimation = Titanium.UI.createAnimation({
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
        bottom:210,
        opacity: .75,
        duration: 300,
        delay: 200,
        zIndex:4
    });
    keyboardToolbar.visible = true;
    keyboardToolbar.animate(keyboarToolbarAnimation);
 
}
 
function hideKeyboardToobar() {
    Ti.API.info("hideKeyboardToobar Function Called")
 
    keyboarToolbarAnimation = Titanium.UI.createAnimation({
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
        bottom:210,
        opacity: 0,
        duration: 100,
        delay: 0,
        zIndex:4
    });
    keyboardToolbar.visible = false;
    keyboardToolbar.animate(keyboarToolbarAnimation);
}
var blurObj;
 
Titanium.App.addEventListener('showKeyboardToolbar', function(e)
{
    showKeyboardToobar();
    //blurObj = e.sourceobj;
});
 
Titanium.App.addEventListener('hideKeyboardToolbar', function(e)
{
    hideKeyboardToobar();
});

// ==============
// = Listeners = for keyboard
// ==============
 
//Done button on the keyboard toolbar to blur the keyboard focus
btn_done.addEventListener('click', function(e)
{
    Titanium.API.info('done btn on keyboard toolbar fired');
    tb_spintestbefore.blur();
    Titanium.App.fireEvent("hideKeyboardToolbar");
});


// create table view data object
var data = [];

data[0] = {
	title:'Type:*',
	hasChild:true,
	url:'/views/v_GaugingCard_FieldDataMeters.js',
	header:'Meter',
	validation:{ reqd:true }
};

var row = Ti.UI.createTableViewRow({
	height:50
});
row = Ti.UI.createTableViewRow({
	height:50,
	header:'Spin test (secs)'
});

var lb_spintestbefore = Ti.UI.createLabel({
	text:'Before:*',
	color:'#999',
	textAlign:'left'
});
var tb_spintestbefore = Titanium.UI.createTextField({
	color:'#999',
	height:35,
	left:100,
	width:220,
	keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	validation:{ isdouble:false, isinteger:true, range:{min:0,max:100},minchars:1,maxchars:3,reqd:true },
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	isValid:false
});

tb_spintestbefore.addEventListener('change', function(e) {
	tb_spintestbefore.isValid = checkValidation(tb_spintestbefore);
});

tb_spintestbefore.addEventListener('blur', function(e) {
	if(e.source.isValid === false)
	displayValErr();
});

tb_spintestbefore.addEventListener('focus', function(e) {
//show keyboard
Titanium.App.fireEvent("showKeyboardToolbar");
});

row.add(lb_spintestbefore);
row.add(tb_spintestbefore);

data[data.length+1] = row;
row = Ti.UI.createTableViewRow({
	height:50
});

var lb_spintestafter = Ti.UI.createLabel({
	text:'After:*',
	color:'#999',
	textAlign:'left'

});
var tb_spintestafter = Titanium.UI.createTextField({
	color:'#999',
	height:35,
	left:100,
	width:220,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	validation:{ isdouble:false, isinteger:true, range:{min:0,max:100},minchars:1,maxchars:3,reqd:true },
	keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	isValid:false
});


tb_spintestafter.addEventListener('change', function(e) {
	tb_spintestafter.isValid = checkValidation(tb_spintestafter);
});

tb_spintestafter.addEventListener('blur', function(e) {
	if(e.source.isValid === false)
	displayValErr();
});

row.add(lb_spintestafter);
row.add(tb_spintestafter);
data[data.length+1] = row;

data[data.length+1] = {
	title:'Method:*',
	dialogid:'MeasuredMethod',
	hasChild:true,
	origtitle: 'Method: ',
	dialogoptions :['slackline','cableway','boat','upstream bridge','downstream bridge','wading', 'volumetric'],
	header:'Measured'
};

row = Ti.UI.createTableViewRow({
	height:50
});

var lb_measured = Ti.UI.createLabel({
	text:'Distance(m):*',
	color:'#999',
	textAlign:'left'

});
var tb_measured = Titanium.UI.createTextField({
	color:'#999',
	height:35,
	left:120,
	width:200,
	keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
	validation:{ isdouble:false, isinteger:true, range:{min:0,max:200},minchars:1,maxchars:3,reqd:true },
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	isValid:false
});

tb_measured.addEventListener('change', function(e) {
	tb_measured.isValid = checkValidation(tb_measured);
});

tb_measured.addEventListener('blur', function(e) {
	if(e.source.isValid === false)
	displayValErr();
});

row.add(lb_measured);
row.add(tb_measured);

data[data.length+1] = row;

data[data.length+1] = {
	title:'Position:*',
	hasChild:true,
	dialogid:'MeasuredPosition',
	origtitle: 'Position: ',
	dialogoptions : ['above','below','at']
};

data[data.length+1] = {
	title:'Landmark:*',
	hasChild:true,
	dialogid:'MeasuredLandmark',
	origtitle: 'Landmark: ',
	dialogoptions : ['Bridge','Recorder','Ford','Weir','Culvert D/S','Culvert U/S','Staff Gauge','Confluence','Slackline','Intake','Cable Way','Underneath Bridge']
};

data[data.length+1] = {
	title:'Direction:*',
	hasChild:true,
	header:'Wind',
	dialogid:'WindDirection',
	origtitle: 'Direction: ',
	dialogoptions : ['Up','Down','Across']
};

row = Ti.UI.createTableViewRow({
	height:50
});

var lb_wind = Ti.UI.createLabel({
	text:'Speed (km/h):*',
	color:'#999',
	textAlign:'left'

});
var tb_wind = Titanium.UI.createTextField({
	color:'#999',
	height:35,
	left:120,
	width:200,
	keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
	validation:{ isdouble:false, isinteger:true, range:{min:0,max:99},minchars:1,maxchars:2,reqd:true },
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	isValid:false
});

tb_wind.addEventListener('change', function(e) {
	tb_wind.isValid = checkValidation(tb_wind);
});

tb_wind.addEventListener('blur', function(e) {
	if(e.source.isValid === false)
	displayValErr();
});

row.add(lb_wind);
row.add(tb_wind);

data[data.length+1] = row;

data[data.length+1] = {
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
	validation:{ isdouble:false, isinteger:true, range:{min:0,max:200},minchars:1,maxchars:3,reqd:true },
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	isValid:false
});

tb_current.addEventListener('change', function(e) {
	tb_current.isValid = checkValidation(tb_current);
});

tb_current.addEventListener('blur', function(e) {
	if(e.source.isValid === false)
	displayValErr();
});

row.add(lb_current);
row.add(tb_current);

data[data.length+1] = row;

data[data.length+1] = {
	title:'Colour:*',
	hasChild:true,
	header:'Water',
	dialogid:'WaterColour',
	origtitle: 'Colour: ',
	dialogoptions : ['discoloured','clear','turbid']
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
	validation:{ isdouble:true, isinteger:false, range:{min:-10,max:35},minchars:1,maxchars:5,reqd:true },
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	isValid:false
});

tb_temp.addEventListener('change', function(e) {
	tb_temp.isValid = checkValidation(tb_temp);
});

tb_temp.addEventListener('blur', function(e) {
	if(e.source.isValid === false)
	displayValErr();
});

row.add(lb_temp);
row.add(tb_temp);

data[data.length+1] = row;

tableView = Ti.UI.createTableView({
	data:data
});

tableView.addEventListener('click', function(e) {
	// dialogs
	if (e.rowData.dialogid) //exists
	{
		Ti.API.debug('dialog exists => open it');
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
	if (e.title ==='Type: FlowTracker' || e.title ==='Type: ADCP') {

row = Ti.UI.createTableViewRow({
	height:50
});

//tb_spintestafter.hide;	
//row.add(lb_spintestafter);
//row.add(tb_spintestafter);

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

//add validation
win.add(valView);
