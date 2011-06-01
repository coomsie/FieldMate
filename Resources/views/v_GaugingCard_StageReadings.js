var win = Titanium.UI.currentWindow;

//only add the button if draft or new tab is open. FROM OPEN FORM DATA
myform = Ti.App.model.get_currentform();

var header = Ti.UI.createLabel({
	color:'fff',
	backgroundColor:'#9ca9b3',
	font: {
		fontSize:14,
		fontWeight:'bold',
		fontFamily:'Arial'
	},
	top:0,
	left:0,
	height:25,
	width:320,
	text:'Type:		Time:	Recorder:		EPB(m):		ESG(m):		+/-:'
});

var data = [];

var mylb = function (mytext,w,l,fontsize) {
	if(fontsize ===null)
		fontsize = 14;
	lb  = Ti.UI.createLabel({
		color:'#222',
		font: {
			fontSize:fontsize,
			fontWeight:'normal',
			fontFamily:'Arial'
		},
		left:l,
		height:38,
		width:w,
		text:mytext,
		textAlign:'right'
	});
	return lb;
}
var tableView = Titanium.UI.createTableView({
	data:data,
	top:25,
	height:200,
	///deleteButtonTitle:'Delete',
	editable:true
});

// add delete event listener
tableView.addEventListener('delete', function(e) {
	Titanium.API.info("row myid = " + e.row.myid + "deleted - row="+e.row+", index="+e.index+", section="+e.section);
});
// add click event listener
tableView.addEventListener('click', function(e) {
	Titanium.API.info( "deleted - row="+e.row+", index="+e.index+", section="+e.section);
	//open dialog
	var win = null;
	if (Ti.Platform.name == "android") {
		win = Titanium.UI.createWindow({
			url:'/views/v_GaugingCard_StageReadingsAdd.js',
			title:'Edit Reading',
			data: e.row.data,
			myrowid: e.index
		});
	} else {
		win = Titanium.UI.createWindow({
			url:'/views/v_GaugingCard_StageReadingsAdd.js',
			title:'Edit Reading',
			backgroundColor:'#fff',
			barColor:'#1A75A2',
			data: e.row.data,
			myrowid: e.index
		});
	}
	Titanium.UI.currentTab.open(win, {
		animated:true
	});
});
win.add(header);
win.add(tableView);

Ti.App.db.readStageReadings(myform.siteid,createHistoryView);

function createHistoryView(data) {
	var HistorytableView = Titanium.UI.createTableView({
		data:createHistoryRows(data),
		top:225,
		///deleteButtonTitle:'Delete',
		editable:false
	});

	win.add(HistorytableView);
};

//button
//iphone version
var add = Titanium.UI.createButton({
	// system buttons
	systemButton:Titanium.UI.iPhone.SystemButton.ADD
});

add.addEventListener('click', function() {
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
	Titanium.UI.currentTab.open(win, {
		animated:true
	});
});

//add refresh button iOS
//only add the button if draft or new tab is open. FROM OPEN FORM DATA
if (myform.details.isReadonly !== true)
if (Ti.Platform.name === 'iPhone OS') {
	win.setRightNavButton(add);
};

//add if android

// add android specific tests
if (myform.details.isReadonly !== true)
if (Titanium.Platform.osname === 'android') {
	Ti.API.info("creating menu option");
	var win = Ti.UI.currentWindow;
	var activity = Ti.Android.currentActivity;
	// Here is an example of creating the menu handlers in the window creation options.
	activity.onCreateOptionsMenu = function(e) {
		Ti.API.debug("In onCreateOptionsMenu");
		var menu = e.menu;

		var m1 = menu.add({
			title : 'Add Reading'
		});
		m1.addEventListener('click', function(e) {
			Ti.API.info("Add Reading button fired");
			//open window
			var win = null;
			win = Titanium.UI.createWindow({
				url:'/views/v_GaugingCard_StageReadingsAdd.js',
				title:'Add Reading'
			});
			Titanium.UI.currentTab.open(win, {
				animated:true
			});
		});
	}
};

//create history UI
function createHistoryRows(data) {
	var histdata = [];

	//make empty row data row
	if(data.length === 0)
		histdata = [{
			title : '(no data)',
			header: 'History'
		}];

	if(data.length !== 0)
		for (var i = data.length - 1; i >= 0; i--) {

			var row = Ti.UI.createTableViewRow();
			row.height  =38;
			row.myid = i;
			row.className = 'StageHistory';

			if (i === 0)
				row.header = 'History';

			var type =  mylb(data[i].type,20,5);
			var datetaken =  mylb(data[i].datetaken,65,30,12);
			var recorder =  mylb(data[i].recorderstage,53,100);
			var epb =  mylb(data[i].wellstage,53,160);
			var esg =  mylb('',53,225);
			if(data[i].wellstage !== 0) {
				var diff =  mylb(Math.round(Math.abs(data[i].recorderstage - data[i].wellstage)*1000),20,295);
			} else {
				var diff =  mylb('',20,295);
			}
			type.rowNum = i;
			datetaken.rowNum = i;
			recorder.rowNum = i;
			epb.rowNum = i;
			esg.rowNum = i;
			diff.rowNum = i;
			row.add(type);
			row.add(datetaken);
			row.add(recorder);
			row.add(epb);
			row.add(esg);
			row.add(diff);
			histdata.push(row);
		}

	//re sort array
	histdata.reverse();
	return	histdata;
}

/// event to accept the stage readings add event
Ti.App.addEventListener('add_reading', function(e) {
	tableView.appendRow( create_stageRow(e) , {
		animated:true
	});
});
/// event to accept the stage readings add event
Ti.App.addEventListener('edit_reading', function(e) {
	tableView.updateRow( e.myrowid ,create_stageRow(e) , {
		animated:true
	});
});
//function for add reading and edit reading
// creating the approirate row
function create_stageRow(e) {
	var row = Ti.UI.createTableViewRow();
	row.height  =38;
	row.className = 'Stage';
	//add data to row
	var type =  mylb(e.rtypeid,20,5);
	var datetaken =  mylb(e.datetaken,50,30);
	var recorder =  mylb(e.recorder,53,100);
	var epb =  mylb(e.epb,53,160);
	var esg =  mylb(e.esg,53,225);
	if(e.epb !== 0) {
		var diff =  mylb(e.diff,20,295);
	} else {
		var diff =  mylb('',20,295);
	}
	row.add(type);
	row.add(datetaken);
	row.add(recorder);
	row.add(epb);
	row.add(esg);
	row.add(diff);
	row.data = {
		myrowid: tableView.length-1,
		rtypeid:e.rtypeid,
		rtype:e.rtype,
		datetaken:e.datetaken,
		recorder:e.recorder,
		epb:e.epb,
		esg:e.esg,
		diff:e.diff
	};	///testing
	return row;
}