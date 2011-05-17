//  v_sync.js
//  FieldMate
//
//  Created by Iain Campion on 2011-05-10.
//  Copyright 2011 Iain Campion. All rights reserved.
//

function Sync_View() {
	
var m = Ti.App.model;

//create  FORMS  UI
Sync_View.prototype.createSync = function init_sync_view(win)
{
// create table view data object
Ti.API.info('create table view data object');

var data = Ti.App.db.readForms('submitted');
// create table view
var tableview = Titanium.UI.createTableView({
	data:data
});

tableview.addEventListener('click', function(e) {
	if (e.rowData.url) {
		Ti.API.info('load child UI' + e.rowData.url);
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
// add table view to the window
win.add(tableview);

var alertDialog = Titanium.UI.createAlertDialog({
	title: 'Update',
	message: 'You are about to update?',
	buttonNames: ['OK','Cancel']
});

alertDialog.addEventListener('click', function(e) {
	if(e.index !== 1) {
		if(Ti.App.utils.checkNetwork) {
			Titanium.API.info("grabbing all lookup files");
			var filetotal = m.appConfig.LookupURLS.length;
			//create progress bar
			var pb = new Ti.App.utils.ProgressBar();
			pb.create(filetotal);
			Titanium.API.info("add pb to win");
			var win = Titanium.UI.currentWindow;
			if (Titanium.Platform.name === 'iPhone OS') {
				win.setToolbar([pb.flexSpace,pb.ui,pb.flexSpace]);
			};
			/// grab all lookup files
			var it = 1;
			getEachFile();
			function getEachFile() {
				Titanium.API.debug('filenum ' + it);
				Titanium.API.debug('filetotal ' + filetotal);
				if (it <= filetotal) {
					Titanium.API.debug('call function');
					Ti.App.utils.getLookupData(m.appConfig.LookupURLS[it-1].URL,m.sites,m.appConfig.LookupURLS[it-1].FileName,pb,getEachFile);
					it++;
				};
			};

		};
	};
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
	var win = Ti.UI.currentWindow;
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
return data.length;
};

};