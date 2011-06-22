Titanium.include('../../helpers/validation.js');

// FORM MODEL
var myform = {
	//variables that need to be present for all forms
	details : {
	id: null, //id form db
	name: null,
	type: 'GaugingCard',
	ver: 1.0,
	user: null,
	isReadonly: false,
	rules: [
               	{ 
               		spintestbefore: {isdouble:false, isinteger:true, range:{min:0,max:100},minchars:1,maxchars:3,reqd:true }
                    },
               	{ 
               		spintestafter:{ isdouble:false, isinteger:true, range:{min:0,max:100},minchars:1,maxchars:3,reqd:true }
                	},
				{ 
					measureddistance:{ isdouble:false, isinteger:true, range:{min:0,max:200},minchars:1,maxchars:3,reqd:true }
					},
				{ 
					windspeed:{ isdouble:false, isinteger:true, range:{min:0,max:99},minchars:1,maxchars:2,reqd:true }
					},
				{ 
					anglecurrent:{ isdouble:false, isinteger:true, range:{min:0,max:200},minchars:1,maxchars:3,reqd:true }
					},
				{ 
					watertemp:{ isdouble:true, isinteger:false, range:{min:-10,max:35},minchars:1,maxchars:5,reqd:true }
				},
				{
					watercolour:{reqd:true }
				},
				{
					angletype:{reqd:true }
				},
				{
					winddirection:{reqd:true }
				},
				{
					measuredlandmark:{reqd:true }
				},
				{
					measuredposition:{reqd:true }
				},
				{
					measuredmethod:{reqd:true }
				},
				{
					metertype:{reqd:true }
				},
				{
					siteid:{reqd:true }
				},
				{
					stagereadings: {reqd:true }
				},
				{
					stagereadingstimetaken: { isdouble:false, isinteger:true, range:{min:0,max:2199},minchars:3,maxchars:4,reqd:true }
				},
				{
					stagereadingsrecord: { isdouble:true, isinteger:false, range:{min:0,max:99},minchars:3,maxchars:6,reqd:false }
				},
				{
					stagereadingswell: { isdouble:true, isinteger:false, range:{min:0,max:99},minchars:3,maxchars:6,reqd:false }
				},
				{
					stagereadingsgauge: { isdouble:true, isinteger:false, range:{min:0,max:99},minchars:3,maxchars:6,reqd:false }
				},
				{
					stagereadingsdif: { isdouble:true, isinteger:false, range:{min:0,max:99},minchars:3,maxchars:6,reqd:false }
				},
				{
					computeddischarge : { isdouble:true, isinteger:false, range:{min:0,max:100},minchars:1,maxchars:3,reqd:false }
				},
				{
					computedarea :{ isdouble:true, isinteger:false, range:{min:0,max:100},minchars:1,maxchars:3,reqd:false }
				},
				{
					computedmeanvel : { isdouble:true, isinteger:false, range:{min:0,max:100},minchars:1,maxchars:3,reqd:false }
				}
              ]
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
	stagereadings : [
	// structure is
	// {
	// typeid : null,
	// typedesc : null,
	// timetaken : null,
	// recorder : null,
	// epb : null,
	// esg : null,
	// diff : null
	// }
	]
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
		///CHECK IF IT VALID
		if (runValidation())
		{
		fm = Ti.App.model.get_currentform();
		fm.details.isReadonly = true;
		Ti.App.model.set_currentform(fm);
		Ti.App.utils.saveForm(); //simple save db test
		Ti.App.utils.submitForm(); //simple save db test
		//close window.
		Titanium.UI.currentWindow.close();
		Ti.App.tabGroup.setActiveTab(0); //send back to new form.
		}else
		{
			alert('Form has error, pse correct. :)')
		}
		}
		
		
	})
});

//only add the button if draft or new tab is open. FROM OPEN FORM DATA
fm = Ti.App.model.get_currentform();
if (fm.details.isReadonly !== true)
Titanium.UI.currentWindow.rightNavButton = btn_submit;

Titanium.UI.currentWindow.title = 'Gauging Recorder';

function runValidation()
{
	
	setValidationRules(fm.details.rules);
	
	var isValid = true;
	//for every rule grab field and run validation
	for (var i = fm.details.rules.length - 1; i >= 0; i--){
	
	//if (fm.details.rules[i].hasOwnProperty(id)) r = fm.details.rules[i][id]; //use  bracket notatio when dynamic
	var fieldname;
	
	for(var key in fm.details.rules[i]) {
		if (key){
  	Ti.API.debug('debugkey' + key);
  	fieldname  = key;
  	}
	}
	
	Ti.API.debug('fieldname '+ fieldname);
	
	//grab form field
	//fm[fieldname]
	
	var obj = {
		value: '',
		color: null,
		validation : []
	}
	if(fm[fieldname] !== null)
	obj.value = fm[fieldname];
	
	//check validation only if field exists
	if(obj.value !== undefined)
	{
	if(!checkValidation( obj, fieldname))
	isValid = false;
	}
	
	};
	return isValid;
}

} //end of function createFormMasterUI