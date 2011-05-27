//Ti.App.utils.readLookupFiles('metertypes.json',Ti.App.model.mymetertypes,fn_buildmeterTbl);


var win = Titanium.UI.currentWindow;

// create more button
var btnAdd = Titanium.UI.createButton({
	 title:'More'
})
var fulllist = false;
//set listener
btnAdd.addEventListener('click', function(e) {
	//reload tableview with all entries
	fulllist = true;
	Ti.App.utils.readLookupFiles('metertypes.json',null,fn_buildmeterTbl);
});

win.setRightNavButton(btnAdd);

function fn_buildmeterTbl(mymetertypes) {
	
	Ti.API.info('build list data');
	///to hold list data
	var data = [];
	Ti.API.info('fullist? ' + fulllist + 'mymetertypes lght ' + mymetertypes.data.item.length);
	if (mymetertypes.data.length !==0) {
		///restrict list to x number or favourte list
		for (var i = mymetertypes.data.item.length - 1; i >= 0; i--) {
			{
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
			
			///favourite check
			if (fulllist === false)
			{
			//only add if favourite
			if (mymetertypes.data.item[i].Fav === 'true' ) 
			data.push(thisRow);
			}
			else
			{
			data.push(thisRow);
			}
			
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

//call the reading of the file and start things off
Ti.App.utils.readLookupFiles('metertypes.json',null,fn_buildmeterTbl);
