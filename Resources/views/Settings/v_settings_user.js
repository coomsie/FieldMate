var win = Titanium.UI.currentWindow;

var data = [{title:'Phil Downes'},
			{title:'Pete Mayall'},
			{title:'Ross Everest'},
			{title:'Martin Webb'},
			{title:'Julie Blyth'},
			{title:'Iain Campion'},
			{title:'Alex ..'}];


var search = Titanium.UI.createSearchBar();

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	search:search
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);

// create table view event listener
tableview.addEventListener('click', function(e)
{
	// event data
	var index = e.index;
	var section = e.section;
	var row = e.row;
	var rowdata = e.rowData;
	//Titanium.UI.createAlertDialog({title:'Table View',message:'row ' + row + ' index ' + index + ' section ' + section  + ' row data ' + rowdata}).show();
	Ti.App.fireEvent('change_user', {title:e.row.title});
	win.close({animated:true});
});
