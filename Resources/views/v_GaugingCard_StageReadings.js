var win = Titanium.UI.currentWindow;

var header = Ti.UI.createLabel({
		color:'#576996',
		font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
		left:20,
		top:2,
		height:25,
		width:320,
		text:'Type:		Time:	Recorder:		Well:		Gauge:		+/-:'
	});
	
var data = [];
// create the rest of the rows
for (var c=0;c<5;c++)
{
	var row = Ti.UI.createTableViewRow();
	row.height  =35;
	row.myid = c;

	var comment = Ti.UI.createLabel({
		color:'#222',
		font:{fontSize:16,fontWeight:'normal', fontFamily:'Arial'},
		left:20,
		//top:21,
		height:35,
		width:320,
		text:'M |	1300 |     .733 |     .75 |   .75	|   5'
	});
	comment.rowNum = c;
	row.add(comment);


	data.push(row);
}
var tableView = Titanium.UI.createTableView({
	data:data,
	top:25,
	///deleteButtonTitle:'Delete',
	editable:true
});


// add delete event listener
tableView.addEventListener('delete',function(e)
{
	Titanium.API.info("row myid = " + e.row.myid + "deleted - row="+e.row+", index="+e.index+", section="+e.section);
});

win.add(header);
win.add(tableView);

tableView.addEventListener('delete',function(e)
{
	var s = e.section;
	Ti.API.info('rows ' + s.rows + ' rowCount ' + s.rowCount + ' headerTitle ' + s.headerTitle + ' title ' + e.rowData.title);

	Titanium.API.info("deleted - row="+e.row+", index="+e.index+", section="+e.section + ' foo ' + e.rowData.foo);
});

//button


//iphone version

var add = Titanium.UI.createButton({
	title:'Add'
});

add.addEventListener('click', function()
{
	//open dialog
	var win = null;
		if (Ti.Platform.name == "android") {
			win = Titanium.UI.createWindow({
				url:'/views/v_GaugingCard_StageReadingsAdd.js',
				title:'Add Reading'
			});
		} else {
			win = Titanium.UI.createWindow({
				url:'/views/v_GaugingCard_StageReadingsAdd.js',
				title:'Add Reading',
				backgroundColor:'#fff',
				barColor:'#1A75A2'
			});
		}
		Titanium.UI.currentTab.open(win,{animated:true});
});

//add refresh button iOS
		if (Ti.Platform.name === 'iPhone OS') {
		win.setRightNavButton(add);
};

//add if android

// add android specific tests
		if (Titanium.Platform.osname === 'android'){
			Ti.API.info("creating menu option");
			var win = Ti.UI.currentWindow;
			var activity = Ti.Android.currentActivity;
			// Here is an example of creating the menu handlers in the window creation options.
			activity.onCreateOptionsMenu = function(e) {
					Ti.API.debug("In onCreateOptionsMenu");
					var menu = e.menu;
				
					var m1 = menu.add({ title : 'Add Reading' });
					m1.addEventListener('click', function(e) {
					Ti.API.info("Add Reading button fired");
					//open window
					var win = null;
					win = Titanium.UI.createWindow({
					url:'/views/v_GaugingCard_StageReadingsAdd.js',
					title:'Add Reading'
					});
					Titanium.UI.currentTab.open(win,{animated:true});
					});
					} 
		};	

