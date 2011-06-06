
// FORM MODEL
var myform = {
	//variables that need to be present for all forms
	details : {
	id: null, //id form db
	name: null,
	type: 'GaugingCard',
	ver : 1.0,
	isReadonly: false
	}, 
	siteid : '',
	sitename : '',
	river : '',
	lat : 0,
	lng : 0,
	datetaken : '',
	metertype : null,
	spintestbefore : null,
	spintestafter : null,
	measuredmethod : null,
	measuredposition : null,
	measureddistance : null,
	measuredlandmark : null,
	winddirection : null,
	windspeed : null,
	angletype : null,
	anglecurrent : null,
	watercolour : null,
	watertemp : null,
	computeddischarge : null,
	computedarea : null,
	computedmeanvel : null,
	readingremark : null,
	stagereadings : [{
	typeid : null,
	typedesc : null,
	timetaken : null,
	recorder : null,
	epb : null,
	esg : null,
	diff : null
	}]
	};

if (Ti.App.model.get_currentform() === null)
Ti.App.model.set_currentform(myform);

createFormMasterUI();

function createFormMasterUI(){

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
	alertDialog.addEventListener('click',function(e){
		if(e.index !== 1)
		{
		fm = Ti.App.model.get_currentform();
		fm.details.isReadonly = true;
		Ti.App.model.set_currentform(fm);
		Ti.App.utils.saveForm(); //simple save db test
		Ti.App.utils.submitForm(); //simple save db test
		//close window.
		Titanium.UI.currentWindow.close();
		Ti.App.tabGroup.setActiveTab(0); //send back to new form.
		}
		
		
	})
});

//only add the button if draft or new tab is open. FROM OPEN FORM DATA
fm = Ti.App.model.get_currentform();
if (fm.details.isReadonly !== true)
Titanium.UI.currentWindow.rightNavButton = btn_submit;

Titanium.UI.currentWindow.title = 'Gauging Recorder';

}