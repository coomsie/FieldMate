var win = Titanium.UI.currentWindow;

var data = [
			{title:'Ott'},
			{title:'Gurley'},
			{title:'Flowtracker'},
			{title:'ADCP'},
			{title:'Pyguy'}
            ];
// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
});

// create table view event listener
tableview.addEventListener('click', function(e)
{
	//Titanium.UI.createAlertDialog({title:'Table View',message:'row ' + row + ' index ' + index + ' section ' + section  + ' row data ' + rowdata}).show();
	Ti.App.fireEvent('change_fielddata', {rowid: 0, title: 'Type: ' + e.row.title, hasChild:true, url: '/views/GaugingCard/v_FieldDataMeters.js'});
	win.close('/views/GaugingCard/v_FieldData.js',{animated:true});
});
// add table view to the window
Titanium.UI.currentWindow.add(tableview);

