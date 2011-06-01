
var win = Titanium.UI.currentWindow;
var myform = Ti.App.model.get_currentform();
	
//create  UI

//grab values from current form.
var hasChild = true, sitesurl = 'v_GaugingCard_SiteDataRiver.js';
if (myform.details.isReadonly === 'true')
{
	hasChild = false;
	sitesurl = null;
}

// create table view data object
var data = [
	{title:'SiteID*: ' + myform.siteid, hasChild:false},
	{title:'River: ' + myform.river, hasChild:false},
	{title:'SiteName: ' + myform.sitename, hasChild: hasChild, url: sitesurl},
	{title:'Date: ' + myform.datetaken , hasChild:false}
];

//map view
var mapView;
var mapWindow;

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

Ti.App.addEventListener('change_river',function(e)
{
	tableview.updateRow(0 ,{title:'SiteID: ' + e.siteid, hasChild:false});
	tableview.updateRow(1 ,{title:'River: ' + e.river, hasChild:false});
	tableview.updateRow(2 ,{title:'SiteName: ' + e.title, hasChild:true, url:'v_GaugingCard_SiteDataRiver.js'});
	tableview.updateRow(3 ,{title:'Date: ' + e.datetaken, hasChild:false});
	
	/// if in form data the for is new i.e. no unquie code for it => create new and update form model
	Ti.App.utils.saveForm(); //simple save db test
	
	///create maps
	mapView = Ti.App.utils.create_mapView(parseFloat(e.lat), parseFloat(e.lng), e.river, e.title);
	create_btnMap();
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);

//add map btn etc if already have data.
if (myform.sitename !=='')
{
///create maps
	mapView = Ti.App.utils.create_mapView(parseFloat(myform.lat), parseFloat(myform.lng), myform.river, myform.sitename);
	create_btnMap();
}



function create_btnMap()
{

//create map view button when have river
if (!Ti.App.utils.isAndroid) {
	btnMap = Titanium.UI.createButton({
		title:'Map'
	});
	win.rightNavButton = btnMap;
	}
	
///add listener for clicks
btnMap.addEventListener('click',function(e){
	
	//check for network if not dont do anything.
	if(Ti.App.utils.checkNetwork)
	{
	mapWindow = Ti.App.utils.createMapWindow(mapView);
	Ti.API.debug('turn gps on');
	mapView.userLocation=true; //turn on gps.
	mapWindow.open({modal:true});
	}else { alert('No Internet!'); }
}) ///end of btnMap event

};//end of create btn map

