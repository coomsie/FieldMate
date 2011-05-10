function Drafts_View() {
	
//create  FORMS  UI
Drafts_View.prototype.createDrafts = function init_drafts_view(win)
{
// create table view data object
Ti.API.info('create table view data object');

var data = [
	{title:'Waimak Gorge,25April', hasChild:true, url:'/views/v_GaugingCard_Master.js'},
	{title:'Opihi River,25April', hasChild:true, url:'/views/v_GaugingCard_Master.js'},
];

data = Ti.App.db.readForms();
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
// if(!win){
	// Titanium.UI.currentWindow.add(tableview);
// }else
// {
	win.add(tableview);
// }


//try to update the tab badge by return row count
return data.length;

}

}