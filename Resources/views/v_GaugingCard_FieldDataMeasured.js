// 
//  v_GaugingCard_FieldDataMeasured.js
//
//++++++++++ NOTE THIS IS NOT USED +++++++++++++++
//		kept just as an example
//  
//  Created by Iain Campion on 2011-05-11.
//  Copyright 2011 Iain Campion. All rights reserved.
// 


var win = Titanium.UI.currentWindow;

var data = [
			{title:'slackline'},
			{title:'cableway'},
			{title:'boat'},
			{title:'upstream bridge'},
			{title:'downstream bridge'},
			{title:'wading'}, 
			{title:'volumetric'} 
            ];
// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
});

// create table view event listener
tableview.addEventListener('click', function(e)
{
	//Titanium.UI.createAlertDialog({title:'Table View',message:'row ' + row + ' index ' + index + ' section ' + section  + ' row data ' + rowdata}).show();
	Ti.App.fireEvent('change_fielddata', {rowid: 3, title: 'Method: ' + e.row.title, hasChild:true, url: '/views/v_GaugingCard_FieldDataMeasured.js'});
	win.close('/views/v_GaugingCard_FieldData.js',{animated:true});
});
// add table view to the window
Titanium.UI.currentWindow.add(tableview);

