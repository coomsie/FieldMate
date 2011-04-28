	function view_init_sync(win) {
		win.backgroundColor='#fff';
		win.backgroundGradient={type:'linear', colors:['#000001','#6666'], startPoint:{x:0,y:0}, endPoint:{x:320,y:480}, backFillStart:false};
		win.title='Sync';
		win.barColor='#1A75A2';
		win.translucent=true;
		
		
// create table view data object
var data = [
	{title:'GC,Waimak Gorge,25 Jan', hasChild:true, url:'/views/GaugingCard/v_Master.js'},
	{title:'GC,Opihi River,25 Feb', hasChild:true, url:'/views/GaugingCard/v_Master.js'},
	{title:'GC,Heathcote River,12 Feb', hasChild:true, url:'/views/GaugingCard/v_Master.js'}
];

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	top:43
});
		

tableview.addEventListener('click', function(e)
{
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
});

// add table view to the window
win.add(tableview);

//add couple of buttons
var btn_submit = Titanium.UI.createButton({
   title: 'Update',
   width: 70,
   height: 30,
});

btn_submit.addEventListener('click',function(e)
{
   Titanium.API.info("You clicked the submit button");
	var alertDialog = Titanium.UI.createAlertDialog({
   	 				title: 'Update',
				    message: 'You are about to update?',
				    buttonNames: ['OK','Cancel']
					});
	alertDialog.show();
});
win.rightNavButton = btn_submit;
		
		
		
		
	}