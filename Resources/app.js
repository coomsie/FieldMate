Ti.API.info(Ti.App.guid);

//Ti.include('redux.js');
//includeGlobal('models/m_app.js', 'helpers/validation.js');
Titanium.include('joli.js');

//load 
Titanium.include('models/m_app.js');
Ti.App.model = new model();

//Titanium.include('helpers/validation.js');
Titanium.include('controllers/ctr_utils.js');
Ti.App.utils = new utils();

Titanium.include('controllers/ctr_db.js');
Ti.App.db = new db();

Titanium.include('views/v_drafts.js');
Ti.App.Drafts_View = new Drafts_View();

Titanium.include('views/v_sync.js');
Ti.App.Sync_View = new Sync_View();

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
	Ti.App.tabGroup = Titanium.UI.createTabGroup({
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

//Ti.App.myUI.tabGroup = new tabGroup;

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

var badgenumDrafts = Ti.App.Drafts_View.createDrafts(win2);

var tab2 = Titanium.UI.createTab({
	icon:'images/forms.png',
	title:'Draft',
	badge: badgenumDrafts,
	window:win2
});

//create Sync UI Tab
var win3 = Titanium.UI.createWindow({
	id:'win3',
	title:'Sync'
});

var badgenumSync = Ti.App.Sync_View.createSync(win3);

var tab3 = Titanium.UI.createTab({
	icon:'images/sync.png',
	title:'Sync',
	badge:badgenumSync,
	window:win3
});
//load controllers
//Titanium.include('controllers/ctr_syncTab.js');

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

///&(*&(&(&(*&&(&(*&))))))
//try some tab focus events
tab2.addEventListener('blur',function(e)
{
	//try to grab in focus event
	Ti.App.Drafts_View.reloadDrafts(e.source);
});


//
//  add tabs
//
Ti.App.tabGroup.addTab(tab1);
Ti.App.tabGroup.addTab(tab2);
Ti.App.tabGroup.addTab(tab3);
Ti.App.tabGroup.addTab(tab4);

Ti.App.tabGroup.setActiveTab(0);

// open tab group
Ti.App.tabGroup.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});

//set listener for tab changes
// focus event listener for tracking tab changes
Ti.App.tabGroup.addEventListener('focus', function(e)
{
	Ti.API.info("index" + e.index);
	//CHECK IF DRAFT TAB
   if(e.index===1)
   Ti.App.Drafts_View.reloadDrafts(e.source);
   if(e.index===2)
   Ti.App.Sync_View.reloadSync(e.source);
});


//check for all lookup files
Titanium.API.info("check to see all lookup files present");
/// check all lookup files
var lookupfilesPresent,ff=0;
for (var i = Ti.App.model.appConfig.LookupURLS.length - 1; i >= 0; i--) {
	if(Ti.App.utils.lookupFilesExists(Ti.App.model.appConfig.LookupURLS[i].FileName)===false)
	{
		lookupfilesPresent = false;
	}else{
		if(ff===0) //first file present
		{ 
			ff=1;
			//get date updated
			Ti.App.model.appConfig.LookupFilesUpdated = Ti.App.utils.lookupFileTimeStamp(Ti.App.model.appConfig.LookupURLS[i].FileName);
			Ti.API.info('fileudatedlast ' + Ti.App.model.appConfig.LookupFilesUpdated);
		}
		}
};
if(lookupfilesPresent===false) {
	Ti.API.debug('lookupfilePresent:'+lookupfilesPresent);
	alert('Data need updating now.');
	Ti.App.tabGroup.setActiveTab(2);

	// open tab group
	Ti.App.tabGroup.open({
		transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
}
