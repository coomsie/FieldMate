//Ti.include('../redux.js');

//create  FORMS  UI

// create table view data object
var data = [
	{title:'GC,Waimak Gorge,25April', hasChild:true, url:'/views/v_GaugingCard_Master.js'},
	{title:'GC,Opihi River,25April', hasChild:true, url:'/views/v_GaugingCard_Master.js'},
	{title:'GC,Waimak Gorge,5April', hasChild:true, url:'/views/v_GaugingCard_Master.js'},
	{title:'GC,Waimak Basin,23Jan', hasChild:true, url:'/views/v_GaugingCard_Master.js'},
	{title:'GC,Heathcote River,12April', hasChild:true, url:'/views/v_GaugingCard_Master.js'},
	{title:'GC,Taylors Gorge,5April', hasChild:true, url:'/views/v_GaugingCard_Master.js'},
	{title:'GC,Avon Gorge,15April', hasChild:true, url:'/views/v_GaugingCard_Master.js'}
];

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
});
		

tableview.addEventListener('click', function(e)
{
	if (e.rowData.url)
	{
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
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);

