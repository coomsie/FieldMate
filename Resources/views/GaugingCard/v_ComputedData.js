//create UI objects

var win = Ti.UI.currentWindow;

// create table view data object
var data = [];

var row = Ti.UI.createTableViewRow({height:50});

var lb_discharge = Ti.UI.createLabel({
	text:'Discharge:',
	color:'#999',
	textAlign:'left'
});
var tb_discharge = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_discharge);
row.add(tb_discharge);

data[0] = row;
row = Ti.UI.createTableViewRow({height:50});

var lb_area = Ti.UI.createLabel({
	text:'Area:',
	color:'#999',
	textAlign:'left'

});
var tb_area = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_area);
row.add(tb_area);
data[2] = row;

row = Ti.UI.createTableViewRow({height:50});

var lb_meanvel = Ti.UI.createLabel({
	text:'Mean vel:',
	color:'#999',
	textAlign:'left'
});
var tb_meanvel = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
row.add(lb_meanvel);
row.add(tb_meanvel);

data[3] = row;
row = Ti.UI.createTableViewRow({height:50});



var tableView = Ti.UI.createTableView({
	data:data
});

win.add(tableView);

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
	tableview.allowsSelection = false;
	}
	else{
		btn_history.title = 'History';
		tableview.allowsSelection = true;
	}
});
Titanium.UI.currentWindow.rightNavButton = btn_history;