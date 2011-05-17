function Drafts_View() {

	//*** 'me' acts as an alias that can be used within the methods
	var me = this;
	
	var data = [];
	var tableview;

// load /update forms
Drafts_View.prototype.reloadDrafts = function load_drafts_view(win)
{
me.data = [];

me.data = Ti.App.db.readForms('draft');
// create table view
me.tableview.setData(me.data);

}
	
//create  FORMS  UI
Drafts_View.prototype.createDrafts = function init_drafts_view(win)
{
// create table view data object
Ti.API.info('create table view data object');



me.data = Ti.App.db.readForms('draft');
// create table view
me.tableview = Titanium.UI.createTableView({
	data:me.data,
});
		

me.tableview.addEventListener('click', function(e)
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
	win.add(me.tableview);
// }


//try to update the tab badge by return row count
return me.data.length;

}

}