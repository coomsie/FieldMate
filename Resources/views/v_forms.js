///Ti.include('redux.js');

//create  FORMS  UI

// create table view data object
var data = [
	{title:'Gauging Recorder', hasChild:true, url:'/views/v_GaugingCard_Master.js'}
];

// create table view
var tableview = Titanium.UI.createTableView({
	data:data
});
		

tableview.addEventListener('click', function(e)
{
	if (e.rowData.url)
	{
		Ti.API.info('load child UI' + e.rowData.url); 
		var win = null;
		if (Ti.Platform.name === "android") {
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
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);

