	var isAndroid = false;
	if (Titanium.Platform.name == 'android') {
		isAndroid = true;
	}
	
var win = Titanium.UI.currentWindow;
var myform = Ti.App.model.get_currentform();
	
//create  UI

//grab values from current form.
var hasChild = true, sitesurl = 'v_GaugingCard_SiteDataRiver.js';
if (myform.details.isReadonly === true)
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
	mapView = create_mapView(parseFloat(e.lat), parseFloat(e.lng), e.river, e.title);
	Ti.API.info('about to make button');
	create_btnMap();
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);

//add map btn etc if already have data.
if (myform.sitename !=='')
{
///create maps
	mapView = create_mapView(parseFloat(myform.lat), parseFloat(myform.lng), myform.river, myform.sitename);
	Ti.API.info('about to make button');
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
	mapWindow = createMapWindow(mapView);
	Ti.API.debug('turn gps on');
	mapView.userLocation=true; //turn on gps.
	mapWindow.open({modal:true});
	}else { alert('No Internet!'); }
}) ///end of btnMap event

};//end of create btn map




///some functions

function create_mapView(lat, lng , title, subtitle) {

		Ti.API.debug(lat + ' ' +  lng + ' ' + title+ ' ' + subtitle);
		///MAP VIEW
		var mypushpin = Titanium.Map.createAnnotation({
			latitude: lat,
			longitude: lng,
			title: title,
			subtitle: subtitle,
			pincolor: Titanium.Map.ANNOTATION_GREEN,
			animate:true,
			myid:1 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
		});
		//
		// CREATE MAP VIEW
		//
		var _mapview = Titanium.Map.createView({
			mapType: Titanium.Map.STANDARD_TYPE,
			region: {
				latitude:lat,
				longitude:lng,
				latitudeDelta:0.01,
				longitudeDelta:0.01
			},
			animate:true,
			regionFit:true,
			userLocation:false,
			annotations:[mypushpin]
		});

		if (!isAndroid) {
			_mapview.addAnnotation(mypushpin);
		}
		_mapview.selectAnnotation(mypushpin);

		return _mapview;
	};
	///
	/// create window with nav bars etc to show map view in
	///
	// open with //w.open({modal:true});
	function createMapWindow(_mapview) {
		//open  window showing map
		var w = Titanium.UI.createWindow({
			backgroundColor:'#336699',
			title:'Map',
			barColor:'#1A75A2'
		});
		var b = Titanium.UI.createButton({
			title:'Close',
			style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
		});
		w.setLeftNavButton(b);

		//
		// TOOLBAR BUTTONS
		//

		var flexSpace = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});

		// button to change map type to SAT
		var sat = null;
		if (!Ti.App.utils.isAndroid) {
			sat = Titanium.UI.createButton({
				title:'Sat',
				style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
			});
		} else {
			sat = Titanium.UI.Android.OptionMenu.createMenuItem({
				title : 'Sat'
			});
		}
		sat.addEventListener('click', function() {
			// set map type to satellite
			_mapview.setMapType(Titanium.Map.SATELLITE_TYPE);
		});
		// button to change map type to STD
		var std = null;
		if (!Ti.App.utils.isAndroid) {
			std = Titanium.UI.createButton({
				title:'Std',
				style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
			});
		} else {
			std = Titanium.UI.Android.OptionMenu.createMenuItem({
				title : 'Std'
			});
		}
		std.addEventListener('click', function() {
			// set map type to standard
			_mapview.setMapType(Titanium.Map.STANDARD_TYPE);
		});
		// button to change map type to HYBRID
		var hyb = null;
		if (!Ti.App.utils.isAndroid) {
			hyb = Titanium.UI.createButton({
				title:'Hyb',
				style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
			});
		} else {
			hyb = Titanium.UI.Android.OptionMenu.createMenuItem({
				title : 'Hyb'
			});
		}
		hyb.addEventListener('click', function() {
			// set map type to hybrid
			_mapview.setMapType(Titanium.Map.HYBRID_TYPE);
		});
		
		//button for gps on native version
		var gps = null;
		if (!Ti.App.utils.isAndroid) {
			gps = Titanium.UI.createButton({
				title:'GPS',
				style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
			});
		} else {
			gps = Titanium.UI.Android.OptionMenu.createMenuItem({
				title : 'GPS'
			});
		}
		gps.addEventListener('click', function(e){
			e.source.visible = false;
			Ti.API.debug('turn gps on or off =>' + !_mapview.userLocation);
			(_mapview.userLocation === true)? _mapview.userLocation = false : _mapview.userLocation =true; //turn on gps.
			
		});
		
		//button for directions on native version
		var dir = null;
		if (!Ti.App.utils.isAndroid) {
			dir = Titanium.UI.createButton({
				title:'Directions',
				style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
			});
		} else {
			dir = Titanium.UI.Android.OptionMenu.createMenuItem({
				title : 'Directions'
			});
		}
		dir.addEventListener('click', function() {
			//open url to native
			var latlng = _mapview.region.latitude + "," + _mapview.region.longitude;
			var url = "http://maps.google.com/maps?ll="+ latlng + "&daddr=" + latlng;
			Ti.API.debug('turn gps off');
			_mapview.userLocation=false; //turn off gps.
			w.close();
			Ti.Platform.openURL(url);
		});
		if (!Ti.App.utils.isAndroid) {
			w.setToolbar([flexSpace,std,flexSpace,hyb,flexSpace,sat,flexSpace,gps,flexSpace,dir,flexSpace]);
		} else {
			menu.add(std);
			menu.add(hyb);
			menu.add(sat);
			menu.add(gps);
			menu.add(dir);
			Titanium.UI.Android.OptionMenu.setMenu(menu);
		}

		//
		// NAVBAR BUTTONS
		//
		var removeAll = null;

		if (!Ti.App.utils.isAndroid) {
			removeAll = Titanium.UI.createButton({
				style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
				title:'Clear'
			});
		} else {
			removeAll = Titanium.UI.Android.OptionMenu.createMenuItem({
				title:'Remove All'
			});
		}
		removeAll.addEventListener('click', function() {
			_mapview.removeAllAnnotations();
		});
		if (!Ti.App.utils.isAndroid) {
			w.rightNavButton = removeAll;
		}

		w.add(_mapview);
		b.addEventListener('click', function() ///close btn
		{
			Ti.API.debug('turn gps off');
			_mapview.userLocation=false; //turn off gps.
			w.close();
		});
		return w;
	}
	