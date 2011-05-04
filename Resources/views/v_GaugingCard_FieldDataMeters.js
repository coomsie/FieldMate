Titanium.include('../controllers/ctr_utils.js');

var win = Titanium.UI.currentWindow;
///to hold list data
var data = [];

function fn_buildmeterTbl(){
Ti.API.info('build list data');
Ti.API.info(m.mymetertypes.data.item);
Ti.API.info(m.mymetertypes.data.item.length);
if (m.mymetertypes.data.length !==0)
{
	for (var i = m.mymetertypes.data.item.length - 1; i >= 0; i--){
	{
	Ti.API.info(m.mymetertypes.data.item[i]);
	var lb1 = Titanium.UI.createLabel({
  	color:'#000',
  	text:m.mymetertypes.data.item[i].name,
  	id: m.mymetertypes.data.item[i].id,
  	'font-size' : '0.5em',
  	'font-style' : 'italics'
	});
	var thisRow = Ti.UI.createTableViewRow({
  					className:"metertypesdata"
					});
	thisRow.add(lb1);
	data.push(thisRow);
	}
	};
}

Ti.API.info(data);

// var data = [
			// {title:'Ott'},
			// {title:'Gurley'},
			// {title:'Flowtracker'},
			// {title:'ADCP'},
			// {title:'Pyguy'}
            // ];
// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
});

// create table view event listener
tableview.addEventListener('click', function(e)
{
	//Titanium.UI.createAlertDialog({title:'Table View',message:'row ' + row + ' index ' + index + ' section ' + section  + ' row data ' + rowdata}).show();
	Ti.App.fireEvent('change_fielddata', {rowid: 0, title: 'Type: ' + e.source.text, hasChild:true, url: '/views/v_GaugingCard_FieldDataMeters.js'});
	win.close('/views/v_GaugingCard_FieldData.js',{animated:true});
});
// add table view to the window
Titanium.UI.currentWindow.add(tableview);
};


readLookupFiles('metertypes.json',m.mymetertypes,fn_buildmeterTbl);
