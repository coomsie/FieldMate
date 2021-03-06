//  v_sync.js
//  FieldMate
//
//  Created by Iain Campion on 2011-05-10.
//  Copyright 2011 Iain Campion. All rights reserved.
//

function Sync_View() {


	//*** 'me' acts as an alias that can be used within the methods
	var me = this;
	var m = Ti.App.model;
	var win;
	var data = [];
	var tableview;
	var uploadErrorCount=0;
	
// load /update forms
Sync_View.prototype.reloadSync = function load_sync_view(win)
{
me.data = [];

me.data = Ti.App.db.readForms('submitted');
// create table view
me.tableview.setData(me.data);

//set badge
tab3.badge = me.data.length;

}	

//create  FORMS  UI
Sync_View.prototype.createSync = function init_sync_view(win)
{
//assign for future use.
me.win = win;	
	
// create table view data object
Ti.API.info('create table view data object');
me.data = [];

me.data = Ti.App.db.readForms('submitted');
// create table view
me.tableview = Titanium.UI.createTableView({
	data:data
});

me.tableview.addEventListener('click', function(e) {
	if (e.rowData.url) {
		Ti.API.info('load child UI' + e.rowData.url);
		var win = null;
		if (Ti.Platform.name == "android") {
			win = Titanium.UI.createWindow({
				url:e.rowData.url,
				title:e.rowData.title,
				tabBarHidden:true
			});
		} else {
			win = Titanium.UI.createWindow({
				url:e.rowData.url,
				title:e.rowData.title,
				backgroundColor:'#fff',
				barColor:'#1A75A2',
				tabBarHidden:true
			});
		}
		tab3.open(win, {
			animated:true
		});
	}
	
	//load form data into current form plus load id
	var myform = JSON.parse(e.rowData.formmodel);
	myform.details.id =e.rowData.dbrowid;  
	Ti.App.model.set_currentform(myform);
	
});
// add table view to the window
win.add(me.tableview);


///add toolbar for switches
var toolbarSwitchDown = Titanium.UI.createSwitch({
			value:false
		});
var lbSwitchDown = Titanium.UI.createLabel({
	text: 'Download',
	color:'White',
	font:{fontSize:'.5em'},
	textAlign:'right'
});
var myflexSpace=Titanium.UI.createButton({
						systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
					});
if (Titanium.Platform.name === 'iPhone OS') {
				me.win.setToolbar([myflexSpace,lbSwitchDown,toolbarSwitchDown,myflexSpace]);
			};

var alertDialog = Titanium.UI.createAlertDialog({
	title: 'Update',
	message: 'You are about to update?',
	buttonNames: ['OK','Cancel']
});

alertDialog.addEventListener('click', function(e) {
	if(e.index !== 1) {
		if(Ti.App.utils.checkNetwork) {
			// do download if checked
			if (toolbarSwitchDown.value === true)
			{ 
			dataDownload(); ///when finished raise event to start upload
			}else{
			//			UPLOAD PORTION
			//
				do_upload();
			};
		};
	};
});

//function to download data
function dataDownload()
{
	Titanium.API.info("grabbing all lookup files");
			var filetotal = m.appConfig.LookupURLS.length;
			//create progress bar
			var pb = new Ti.App.utils.ProgressBar();
			pb.create(filetotal,'Downloading');
			Titanium.API.info("add pb to win");
			if (Titanium.Platform.name === 'iPhone OS') {
				me.win.setToolbar([pb.flexSpace,pb.ui,pb.flexSpace]);
			};
			/// grab all lookup files
			var it = 1;
			getEachFile();
			function getEachFile() {
				Titanium.API.debug('filenum ' + it);
				Titanium.API.debug('filetotal ' + filetotal);
				if (it <= filetotal) {
					Titanium.API.debug('call function');
					Ti.App.utils.getLookupData(m.appConfig.LookupURLS[it-1],m.sites,pb,getEachFile);
					it++;
				};
			};
};

Ti.App.addEventListener('sync_DownloadingFinished',function(e){
			alert('Downloading of data finished :)')
			do_upload();
});

function do_upload()
{
//
			//			UPLOAD PORTION
			//
			if(me.data.length!==0) ///if there is data present
			{
			uploadErrorCount = 0;
			var filetotal = me.data.length;
			//create progress bar
			var pb = new Ti.App.utils.ProgressBar();
			pb.create(filetotal,'Uploading');
			Titanium.API.info("add pb to win");
			if (Titanium.Platform.name === 'iPhone OS') {
				me.win.setToolbar([pb.flexSpace,pb.ui,pb.flexSpace]);
			};
			
			//do data upload
			
			for (var i = me.data.length - 1; i >= 0; i--){
			pb.setProgressMessage('Uploading Forms ', me.data.length-i, me.data.length);
			//start post
			Ti.App.utils.postFormData("http://tools.ecan.govt.nz/datacatalogue/submit/fieldmate/submitformdata",JSON.parse(me.data[i].formmodel),callback_postFormData,i);
			pb.setProgress();
			};
			
			}else
			{
				alert('No form data to upload :)');
			}
}

function callback_postFormData(status,dbid,tableviewRow)
	{
	if(status) //success , write to db and commit row etc
	{
	//commit to db
	Ti.App.db.uploadForm(dbid);
	//remove row
	me.tableview.deleteRow(tableviewRow);
	//set badge
	tab3.badge -= tab3.badge; 
	
	}else
	{
		uploadErrorCount += 1;
	}
	
	Ti.API.info(uploadErrorCount + 'error cnt');
	}
			
Ti.App.addEventListener('sync_UploadingFinished',function(e)
{
	//do something?
	alert('Uploading of data finished :)')
	//check for errors
	if (uploadErrorCount !== 0 )
				alert( uploadErrorCount + ' form(s) had an error while uploading :)');
				
	//put bak switch?
	me.win.setToolbar([myflexSpace,lbSwitchDown,toolbarSwitchDown,myflexSpace]);
});

//add couple of buttons
var btn_submit = Titanium.UI.createButton({
	title: 'Update',
	width: 70,
	height: 30,
	cancel:1
});
btn_submit.addEventListener('click', function(e) {
	Titanium.API.info("You clicked the update button");
	alertDialog.show();
});
//add refresh button iOS
if (Ti.Platform.name === 'iPhone OS') {
	win.rightNavButton = btn_submit;
}

// add android specific tests
if (Titanium.Platform.osname === 'android') {
	Ti.API.info("creating menu option");
	var activity = Ti.Android.currentActivity;
	// Here is an example of creating the menu handlers in the window creation options.
	activity.onCreateOptionsMenu = function(e) {
		Ti.API.debug("In onCreateOptionsMenu");
		var menu = e.menu;

		var m1 = menu.add({
			title : 'Update'
		});
		m1.addEventListener('click', function(e) {
			Ti.API.info("submit button fired");
			alertDialog.show();
		});
	}
};

//try to update the tab badge by return row count
return me.data.length;
};

};