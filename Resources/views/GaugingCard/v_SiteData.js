//create  UI

var d=new Date();
d.toLocaleDateString();

// create table view data object
var data = [
	{title:'SiteID:', hasChild:false},
	{title:'River:', hasChild:true, url:'v_SiteDataRiver.js'},
	{title:'Date:' + d, hasChild:false},
	{title:'Map Ref:', hasChild:false}
];

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
});
		

tableview.addEventListener('click', function(e)
{
	if (e.rowData.url)
	{
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
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

Ti.App.addEventListener('change_river',function(e)
{
	tableview.updateRow(0 ,{title:'SiteID: ' + e.siteid, hasChild:false});
	tableview.updateRow(1 ,{title:'River: ' + e.title, hasChild:true, url:'v_SiteDataRiver.js'});
	tableview.updateRow(3 ,{title:'Map Ref: ' + e.mapref, hasChild:false});
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);

//add history of button
var btn_history = Titanium.UI.createButton({
   title: 'History',
   width: 70,
   height: 30,
});

btn_history.addEventListener('click',function(e)
{
   Titanium.API.info("You clicked the history button");
	var alertDialog = Titanium.UI.createAlertDialog({
   	 				title: 'History',
				    message: 'history of guage would show (toggle) & read only',
				    buttonNames: ['OK']
					});
	alertDialog.show();
	if(btn_history.title === 'History')
	{
	btn_history.title = 'New';
	tableview.allowsSelection = false;
	}
	else{
		btn_history.title = 'History';
		tableview.allowsSelection = true;
	}
});
Titanium.UI.currentWindow.rightNavButton = btn_history;
