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

//set badge
tab2.badge = me.data.length;

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
	editable:true
});
		
//delete function
// add delete event listener
me.tableview.addEventListener('delete', function(e) {
	if (e.row.dbrowid)
	{
	Titanium.API.info("row myid = " + e.row.dbrowid + "deleted - row="+e.row+", index="+e.index+", section="+e.section);
	//delete form from db.
	Ti.App.db.deleteDraftForm(e.row.dbrowid);
	}
});

//
//  create edit/cancel buttons for nav bar
//
var edit = Titanium.UI.createButton({
	title:'Edit'
});

edit.addEventListener('click', function()
{
	win.setRightNavButton(cancel);
	me.tableview.editing = true;
});

var cancel = Titanium.UI.createButton({
	title:'Cancel',
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});
cancel.addEventListener('click', function()
{
	win.setRightNavButton(edit);
	me.tableview.editing = false;
});

win.setRightNavButton(edit);


me.tableview.addEventListener('click', function(e)
{
	if (e.rowData)
	if (e.rowData.url)
	{
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
		tab2.open(win,{animated:true});
	
	//load form data into current form plus load id
	var myform = JSON.parse(e.rowData.formmodel);
	myform.details.id =e.rowData.dbrowid;  
	Ti.App.model.set_currentform(myform);
	}
});

win.add(me.tableview);


//try to update the tab badge by return row count
return me.data.length;

}

}