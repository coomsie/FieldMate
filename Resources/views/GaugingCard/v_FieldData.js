//create UI objects

var win = Ti.UI.currentWindow;

// create table view data object
var data = [];

data[0] = {title:'Type: [not entered]', hasChild:true, url:'/views/GaugingCard/v_FieldDataMeters.js', header:'Meter'};

var row = Ti.UI.createTableViewRow({height:50});
row = Ti.UI.createTableViewRow({height:50, header:'Spin test (secs)'});

var lb_meter_before = Ti.UI.createLabel({
	text:'Before:',
	color:'#999',
	textAlign:'left'
});
var tb_meter_before = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_meter_before);
row.add(tb_meter_before);

data[1] = row;
row = Ti.UI.createTableViewRow({height:50});

var lb_meter_after = Ti.UI.createLabel({
	text:'After:',
	color:'#999',
	textAlign:'left'

});
var tb_meter_after = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_meter_after);
row.add(tb_meter_after);
data[3] = row;

data[4] = {title:'From: [not entered]', hasChild:true, url:'/views/GaugingCard/v_FieldDataMeasured.js',header:'Measured (m)'};

row = Ti.UI.createTableViewRow({height:50});

var lb_measured_below = Ti.UI.createLabel({
	text:'Below:',
	color:'#999',
	textAlign:'left'
});
var tb_measured_below = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_measured_below);
row.add(tb_measured_below);

data[5] = row;
row = Ti.UI.createTableViewRow({height:50});

var lb_measured_above = Ti.UI.createLabel({
	text:'Above:',
	color:'#999',
	textAlign:'left'

});
var tb_measured_above = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_measured_above);
row.add(tb_measured_above);
data[6] = row;

row = Ti.UI.createTableViewRow({height:50});

var lb_wind = Ti.UI.createLabel({
	text:'Wind (km/h):',
	color:'#999',
	textAlign:'left'

});
var tb_wind = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_wind);
row.add(tb_wind);
data[7] = row;


data[8] = {title:'Type: [not entered]', hasChild:true, url:'/views/GaugingCard/v_FieldDataAngle.js',header:'Angle'};

row = Ti.UI.createTableViewRow({height:50});

var lb_current = Ti.UI.createLabel({
	text:'Current',
	color:'#999',
	textAlign:'left'

});
var tb_current = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_current);
row.add(tb_current);
data[9] = row;



data[10] = {title:'Colour: [not entered]',hasChild:false,url:'/views/GaugingCard/v_FieldDataWater.js', header:'Water'};

row = Ti.UI.createTableViewRow({height:50});

var lb_temp = Ti.UI.createLabel({
	text:'Temp',
	color:'#999',
	textAlign:'left'

});
var tb_temp = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_temp);
row.add(tb_temp);
data[11] = row;



var tableView = Ti.UI.createTableView({
	data:data
});

tableView.addEventListener('click', function(e)
{
	if (e.rowData.url)
	{
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

win.add(tableView);

Ti.App.addEventListener('change_fielddata',function(e)
{
	tableView.updateRow(e.rowid ,{title: e.title, hasChild:e.hasChild, url:e.url},{animated:true});
	//tableview.updateRow(3 ,{title:'From: ' + e.title, hasChild:true,  url:'/views/GaugingCard/v_FieldDataMeasured.js',header:'Measured (m)'});
	//tableview.updateRow(7 ,{title:'Type: ' + e.title, hasChild:false,url:'/views/GaugingCard/v_FieldDataAngle.js',header:'Angle'});
	//tableview.updateRow(9,{title:'Colour: ' + e.title, hasChild:false,url:'/views/GaugingCard/v_FieldDataWater.js', header:'Water'});
	if (e.title ==='Type: Flowtracker' || e.title ==='Type: ADCP')
	{
	tableView.updateRow(1,{title:'n/a'},{animated:true});
	tableView.updateRow(2,{title:'n/a'},{animated:true});
	}
});

//add history of button
var btn_history = Titanium.UI.createButton({
   title: 'History',
   width: 70,
   height: 30,
});

btn_history.addEventListener('click',function(e)
{
   Titanium.API.info("You clicked the history button");
	var alertDialog = Titanium.UI.createAlertDialog({
   	 				title: 'History',
				    message: 'history of guage would show (toggle) & read only',
				    buttonNames: ['OK']
					});
	alertDialog.show();
	if(btn_history.title === 'History')
	{
	btn_history.title = 'New';
	tableView.allowsSelection = false;
	}
	else{
		btn_history.title = 'History';
		tableView.allowsSelection = true;
	}
});





Titanium.UI.currentWindow.rightNavButton = btn_history;
