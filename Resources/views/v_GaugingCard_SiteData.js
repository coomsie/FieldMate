	
	//create  UI

///Ti.API.info(v_GaugingCard.version);

var d=new Date();
d.toLocaleDateString();

// create table view data object
var data = [
	{title:'SiteID:*', hasChild:false},
	{title:'SiteName:', hasChild:true, url:'v_GaugingCard_SiteDataRiver.js'},
	{title:'River:', hasChild:false},
	{title:'Date:' + d, hasChild:false}
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
	tableview.updateRow(1 ,{title:'SiteName: ' + e.title, hasChild:true, url:'v_SiteDataRiver.js'});
	tableview.updateRow(2 ,{title:'River: ' + e.river, hasChild:false});
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);
