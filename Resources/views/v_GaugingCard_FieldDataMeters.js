//Ti.App.utils.readLookupFiles('metertypes.json',Ti.App.model.mymetertypes,fn_buildmeterTbl);

Ti.App.utils.readLookupFiles('metertypes.json',null,fn_buildmeterTbl);

var win = Titanium.UI.currentWindow;

function fn_buildmeterTbl(mymetertypes) {
	
	Ti.API.info('build list data');
	///to hold list data
	var data = [];
	Ti.API.info(mymetertypes.data.item.length);
	if (mymetertypes.data.length !==0) {
		for (var i = mymetertypes.data.item.length - 1; i >= 0; i--) {
			{
			//Ti.API.debug(mymetertypes.data.item[i]);
			var lb1 = Titanium.UI.createLabel({
				color:'#666',
				text:mymetertypes.data.item[i].name,
				id: mymetertypes.data.item[i].id,
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

	/// Ti.API.debug(data);

	// create table view
	var tableview = Titanium.UI.createTableView({
		data:data,
	});

	// create table view event listener
	tableview.addEventListener('click', function(e) {
		//Titanium.UI.createAlertDialog({title:'Table View',message:'row ' + row + ' index ' + index + ' section ' + section  + ' row data ' + rowdata}).show();
		Ti.App.fireEvent('change_fielddata', {
			rowid: 0,
			title: 'Type: ' + e.source.text,
			hasChild:true,
			url: '/views/v_GaugingCard_FieldDataMeters.js'
		});
		win.close('/views/v_GaugingCard_FieldData.js', {
			animated:true
		});
	});
	// add table view to the window
	Titanium.UI.currentWindow.add(tableview);
};