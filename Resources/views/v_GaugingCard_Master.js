
//check global scope exists
if (!v_GaugingCard)
var v_GaugingCard = {};

(function (){
	
v_GaugingCard.version = 1.0;
	
//create  FORMS MASTER  UI

// create table view data object
var data = [
	{title:'Site Data', hasChild:true, url:'/views/v_GaugingCard_SiteData.js'},
	{title:'Field Data', hasChild:true, url:'/views/v_GaugingCard_FieldData.js'},
	{title:'Stage Readings', hasChild:true, url:'/views/v_GaugingCard_StageReadings.js'},
	{title:'Computed Data', hasChild:true, url:'/views/v_GaugingCard_ComputedData.js'},
	{title:'Remarks', hasChild:true, url:'/views/v_GaugingCard_Remarks.js'}
];

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
});
		

tableview.addEventListener('click', function(e)
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

// add table view to the window
Titanium.UI.currentWindow.add(tableview);

//add couple of buttons
var btn_submit = Titanium.UI.createButton({
   title: 'Submit',
   width: 70,
   height: 30
});

btn_submit.addEventListener('click',function(e)
{
   Titanium.API.info("You clicked the submit button");
	var alertDialog = Titanium.UI.createAlertDialog({
   	 				title: 'Submit',
				    message: 'You are about to submit?',
				    buttonNames: ['OK','Cancel']
					});
	alertDialog.show();
});
Titanium.UI.currentWindow.rightNavButton = btn_submit;
// end of init.
})();

