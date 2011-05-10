Ti.API.info(Ti.App.guid);

//Ti.include('redux.js');
//includeGlobal('models/m_app.js', 'helpers/validation.js');

//load 
Titanium.include('models/m_app.js');
Titanium.include('helpers/validation.js');
Titanium.include('controllers/ctr_utils.js');
Titanium.include('controllers/ctr_db.js');
Titanium.include('views/v_drafts.js');

Ti.App.utils = new utils();
Ti.App.db = new db();
Ti.App.model = new model();
var m = Ti.App.model;
Ti.App.views = new Drafts_View();

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#6666');

//Message windows
var messageWin = Titanium.UI.createWindow({
	height:30,
	width:250,
	bottom:70,
	borderRadius:10,
	touchEnabled:false,

	orientationModes : [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	]
});
var messageView = Titanium.UI.createView({
	id:'messageview',
	height:30,
	width:250,
	borderRadius:10,
	backgroundColor:'#000',
	opacity:0.7,
	touchEnabled:false
});

var messageLabel = Titanium.UI.createLabel({
	id:'messagelabel',
	text:'',
	color:'#fff',
	width:250,
	height:'auto',
	font: {
		fontFamily:'Helvetica Neue',
		fontSize:13
	},
	textAlign:'center'
});
messageWin.add(messageView);
messageWin.add(messageLabel);

// create tab group
var tabGroup = Titanium.UI.createTabGroup({
	barColor:'#1A75A2',
	backgroundGradient: {
		type:'linear',
		colors:['#000001','#6666'],
		startPoint: {
			x:0,
			y:0
		},
		endPoint: {
			x:320,
			y:480
		},
		backFillStart:false
	}
});

var win = Titanium.UI.currentWindow;

// forms Tab ///
var win1 = Titanium.UI.createWindow({
	id:'win1',
	title:'New',
	url:'views/v_forms.js'
});
var tab1 = Titanium.UI.createTab({
	icon:'images/forms.png',
	title:'New',
	window:win1
});

//load controllers
//Titanium.include('controllers/ctr_formsTab.js');

// forms Tab ///
var win2 = Titanium.UI.createWindow({
	id:'win2',
	title:'Draft'
});

var badgenum = Ti.App.views.createDrafts(win2);

var tab2 = Titanium.UI.createTab({
	icon:'images/forms.png',
	title:'Draft',
	badge: badgenum,
	window:win2
});

//load controllers
//Titanium.include('controllers/ctr_formsTab.js');

// forms Tab ///
// var win3 = Titanium.UI.createWindow({
// id:'win3',
// title:'History',
// url:'views/v_forms.js'
// });
// var tab3 = Titanium.UI.createTab({
// icon:'images/forms.png',
// title:'History',
// window:win3
// });

//load controllers
//Titanium.include('controllers/ctr_formsTab.js');

//create Sync UI Tab
var win3 = Titanium.UI.createWindow({
	id:'win3',
	url:'views/v_sync.js'
});
var tab3 = Titanium.UI.createTab({
	icon:'images/sync.png',
	title:'Sync',
	badge:3,
	window:win3
});
//load controllers
//Titanium.include('controllers/ctr_syncTab.js');

//3Day tab ///
//create settings UI Tab
var win4 = Titanium.UI.createWindow({
	id:'win4',
	url:'views/v_settings.js'
});
var tab4 = Titanium.UI.createTab({
	icon:'images/settings.png',
	title:'Settings',
	window:win4
});
//load controllers
//Titanium.include('controllers/ctr_settingsTab.js');

//
//  add tabs
//
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);

tabGroup.setActiveTab(0);

// open tab group
tabGroup.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});

//set listener for tab changes
// focus event listener for tracking tab changes
tabGroup.addEventListener('focus', function(e)
{
	Ti.API.info("prev index" + e.previousIndex);
	//CHECK IF DRAFT TAB
   if(e.index===1)
   Ti.App.views.createDrafts(Titanium.UI.currentWindow);
   //win2.tableview.data = Ti.App.db.readForms();
});


//check for all lookup files
Titanium.API.info("check to see all lookup files present");
/// check all lookup files
var lookupfilesPresent;
for (var i = m.appConfig.LookupURLS.length - 1; i >= 0; i--) {
	if(Ti.App.utils.lookupFilesExists(m.appConfig.LookupURLS[i].FileName)===false)
		lookupfilesPresent = false;
};
if(lookupfilesPresent===false) {
	Ti.API.debug('lookupfilePresent:'+lookupfilesPresent);
	alert('Files need updating');
	tabGroup.setActiveTab(2);

	// open tab group
	tabGroup.open({
		transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
}

// //set listener for tab changes
// // focus event listener for tracking tab changes
// tabGroup.addEventListener('focus', function(e)
// {
// Ti.API.info("tab 0 focus fired & prev index" + e.previousIndex);
// //check if to weather and needs refresh.
// if(e.index===0 && e.previousIndex!=0  && m.refresh===true)
// //some code
// });

var myJSONObject = new Object;

Ti.App.utils.readLookupFiles('stagedreadings.json',myJSONObject,Ti.App.db.mytestfn);


///some functions
