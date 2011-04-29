var win = Titanium.UI.currentWindow;

		win.backgroundColor='#fff';
		win.backgroundGradient={type:'linear', colors:['#000001','#6666'], startPoint:{x:0,y:0}, endPoint:{x:320,y:480}, backFillStart:false};
		win.title='Settings';
		win.barColor='#1A75A2';
		win.translucent=true;
	
	//create UI objects

// create table view data object
var data = [];

var row = Ti.UI.createTableViewRow({height:50});

var lb_svr = Ti.UI.createLabel({
	text:'Server:',
	left: 10,
	textAlign:'left'
});
var tb_svr = Titanium.UI.createTextField({
    height:35,
    left:100,
    width:220,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    value:'http://tools.ecan.govt.nz/fieldmate'
});
row.add(lb_svr);
row.add(tb_svr);

data[0] = row;
data[1] = {title:"User: ",hasChild:true,url:'/views/Settings/v_settings_user.js'};

data[2] = {title:"Region: ",hasChild:true};

var tableView = Ti.UI.createTableView({
	data:data,
	top:44
});

tableView.addEventListener('click', function(e){
	Titanium.API.info(e.index);
	if(e.index ===2) //only show if second row.
		dialog_region.show();
	
	//child js is present	
	if (e.rowData.url)
	{
		Ti.API.info('load child UI' + e.rowData.url); 
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
})


win.add(tableView);

//
// Region dialog
//
var dialog_region = Titanium.UI.createOptionDialog({
	options:['North', 'Central', 'South'],
	//destructive:2,
	//cancel:1,
	title:'Choose region ..'
});

// add event listener
dialog_region.addEventListener('click',function(e)
{
	Titanium.API.info(e.source.options[e.index]);
	tableView.updateRow(2,{title:'Region: ' + e.source.options[e.index] ,hasChild:true},{animated:true});
});
	
Ti.App.addEventListener('change_user',function(e)
{
	tableView.updateRow(1 ,{title:'User: ' + e.title,hasChild:true,url:'/views/Settings/v_settings_user.js'});
});	
	
