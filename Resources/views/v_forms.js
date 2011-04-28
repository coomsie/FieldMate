//create  FORMS  UI

// create table view data object
var data = [
	{title:'Gauging card', hasChild:true, url:'/views/GaugingCard/v_Master.js'},
	{title:'Other form type1', hasChild:false},
	{title:'Other form type2', hasChild:false},
	{title:'Other form type3', hasChild:false},
	{title:'Other form type4', hasChild:false},
	{title:'Other form type5', hasChild:false}
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

