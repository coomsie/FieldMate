	
	//create  UI

///Ti.API.info(v_GaugingCard.version);

// create table view data object
var data = [
	{title:'SiteID:*', hasChild:false},
	{title:'River:', hasChild:false},
	{title:'SiteName:', hasChild:true, url:'v_GaugingCard_SiteDataRiver.js'},
	{title:'Date:' , hasChild:false}
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
	tableview.updateRow(1 ,{title:'River: ' + e.river, hasChild:false});
	tableview.updateRow(2 ,{title:'SiteName: ' + e.title, hasChild:true, url:'v_GaugingCard_SiteDataRiver.js'});
	tableview.updateRow(3 ,{title:'Date: ' + e.datetaken, hasChild:false});
	
	/// if in form data the for is new i.e. no unquie code for it => create new and update form model
	Ti.App.utils.saveForm('GaugingCard',null,'',e.title ); //simple save db test
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);
