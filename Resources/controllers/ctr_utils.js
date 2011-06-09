function utils() {

	//*** 'me' acts as an alias that can be used within the methods
	var me = this;

	// //*** Public properties:

	var isAndroid = false;
	if (Titanium.Platform.name == 'android') {
		isAndroid = true;
	}

	// //*** Protected variables:
	// var somevar = "";

	// //*** Protected method used only internally. Call with 'me.my_own()'
	// this.my_own = function (arg1) {
	// };

	//** PUBLIC METHODS ** //

	///
	//		Get Lookup data from server
	///
	//		myurl =>http url for grab file (json)
	//		myobj =>object to load data in
	//		myfilename => file name to store for persistences
	utils.prototype.getLookupData = function getLookupData(LookupURL,myobj,progressBar,fn_callback) {
		//check network if not do nothing
		if (me.checkNetwork()) {
			var myurl = LookupURL.URL;
			var inDB = LookupURL.inDB;
			var myfilename= LookupURL.FileName;
			
			//start progress bar
			if(progressBar)
				progressBar.setProgressMessage('Downloading ' + myfilename +' ');
			var myresult;
			var xhr2 = Titanium.Network.createHTTPClient();
			xhr2.setTimeout(40000);
			xhr2.onload = function() {
				//set download
				Titanium.API.info('getting json for ' + myfilename + '@ ' + myurl );
				try {
					myobj = JSON.parse(this.responseText);
				} catch(e) {
					m.errorMessage.concat(e.error);
					m.errorDialog.show();
				}
				//Titanium.API.info(myobj);
				///do something with data.
				me.saveLookupFiles(myfilename,myobj,progressBar);
				if(progressBar)
					progressBar.setProgress();
				//load db if needed
				//test function to load up database if present
				if (inDB)
				{
				Ti.App.db.loadData(LookupURL, myobj);
				if(progressBar)
				progressBar.setProgressMessage('Updating Database ' + myfilename +' ');
				}

				fn_callback();
			};
			xhr2.onerror = function(e) {
				Ti.API.error('error getting data' + e.error);
				m.errorMessage.concat(e.error);
				m.errorDialog.show();
				if(progressBar)
					progressBar.hide();
			};
			xhr2.open("GET",myurl);
			xhr2.send();
		}
	};
	///
	//		Save Lookup data from server to device
	///
	//		myobj =>object to load data in
	//		myfilename => file name to store for persistences
	utils.prototype.saveLookupFiles = function saveLookupFiles(myfilename,myobj,progressBar) {
		try {
			Titanium.API.info('starting saving files');
			var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'LookupData');
			appDir.createDirectory();
			var f = Titanium.Filesystem.getFile(appDir.nativePath,myfilename);
			//check already exists? =>delete it
			if(f.exists)
				f.deleteFile;
			f.write(JSON.stringify(myobj));
			Titanium.API.info('file written');
			if(progressBar)
				progressBar.setProgressMessage('Written file ' + myfilename +' ');
			return true;
		} catch(e) {
			Titanium.API.info('writing file lookups error' + e.error);
			m.errorMessage.concat(e.error);
			m.errorDialog.show();
			return false;
		}
	};
	///
	//		Read Lookup data from device and place in object
	///
	//		myobj =>object to load data in
	//		myfilename => file name to store for persistences
	//		fn_callback => function to call back
	utils.prototype.readLookupFiles = function readLookupFiles(myfilename,myobj,fn_callback) {
		this.readFiles(myfilename,myobj,fn_callback,'LookupData','app');
	}
	//		Read Model data from device and place in object
	///
	//		myobj =>object to load data in
	//		myfilename => file name to store for persistences
	//		fn_callback => function to call back
	utils.prototype.readFormModels = function readFormModels(myfilename,myobj,fn_callback) {
		this.readFiles(myfilename,myobj,fn_callback,'models','res');
	}
	///
	/// basic worker for above function
	//		myobj =>object to load data in
	//		myfilename => file name to store for persistences
	//		fn_callback => function to call back
	//		dir => directory it is looking up
	// 		dirtype => application or resources directory [app | res]
	this.readFiles = function readFiles(myfilename,myobj,fn_callback,dir,dirtype) {
		try {
			Titanium.API.info('starting reading files');
			//var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'LookupData');
			if(dirtype==='app')
				var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,dir);
			if(dirtype==='res')
				var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,dir);
			appDir.createDirectory();
			Titanium.API.info(appDir.nativePath);
			var f = Titanium.Filesystem.getFile(appDir.nativePath,myfilename);
			Titanium.API.info(f.nativePath);
			this.myobj = JSON.parse(f.read().text);
			Titanium.API.info('file read');
			Titanium.API.info('calling callback with ' + this.myobj);
			fn_callback(this.myobj);
			return this.myobj;
		} catch(e) {
			Titanium.API.info('reading file lookups error' + e.error);
			m.errorMessage.concat(e.error);
			m.errorDialog.show();
			fn_callback(this.myobj);
		}
	};
	///
	//		Check for network and alert if not on
	///
	utils.prototype.checkNetwork = function checkNetwork() {
		if(Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
			Titanium.API.info('no network present');
			var alertDialog = Titanium.UI.createAlertDialog({
				title: 'WARNING!',
				message: 'Your device is not online.',
				buttonNames: ['OK']
			});
			alertDialog.show();
			return false;
		}
		return true;
	};
	///
	//		Check for Lookup data from device
	///
	//		myfilename => file name to store for persistences
	//		return result =>bool
	utils.prototype.lookupFilesExists = function lookupFilesExists(myfilename) {
		return this.FilesExists(myfilename,'LookupData','app');
	}
	/// basic worker for above function
	//		myfilename => file name to store for persistences
	//		return result =>bool
	//		dir => directory it is looking up
	// 		dirtype => application or resources directory [app | res]
	this.FilesExists = function FilesExists(myfilename,dir,dirtype) {
		try {
			Titanium.API.info('starting checking for files');
			if(dirtype==='app')
				var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,dir);
			if(dirtype==='res')
				var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,dir);
			//appDir.createDirectory();
			Titanium.API.info(appDir.nativePath);
			var f = Titanium.Filesystem.getFile(appDir.nativePath,myfilename);
			Titanium.API.info(f.nativePath);
			Titanium.API.info('File Exists:' + f.exists());
			return f.exists();
		} catch(e) {
			Titanium.API.info('checking file lookups error' + e.error);
			m.errorMessage.concat(e.error);
			m.errorDialog.show();
			return false;
		}
	};
	///
	//		Check for Lookup data from device
	///
	//		myfilename => file name to store for persistences
	//		return result =>bool
	utils.prototype.lookupFileTimeStamp = function lookupFileTimeStamp(myfilename) {
		return this.FileTimeStamp(myfilename,'LookupData','app');
	}
	/// basic worker for above function
	//		myfilename => file name to store for persistences
	//		return result =>long
	//		dir => directory it is looking up
	// 		dirtype => application or resources directory [app | res]
	this.FileTimeStamp = function FileTimeStamp(myfilename,dir,dirtype) {
		try {
			Titanium.API.info('starting checking for file Timestamp');
			if(dirtype==='app')
				var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,dir);
			if(dirtype==='res')
				var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,dir);
			//appDir.createDirectory();
			Titanium.API.info(appDir.nativePath);
			var f = Titanium.Filesystem.getFile(appDir.nativePath,myfilename);
			Titanium.API.info(f.nativePath);
			Titanium.API.info('File Timestamp:' + f.modificationTimestamp());
			return f.modificationTimestamp();
		} catch(e) {
			Titanium.API.info('checking file Timestamp error' + e.error);
			m.errorMessage.concat(e.error);
			m.errorDialog.show();
			return false;
		}
	};
	///
	//		Create a progress bar
	///
	//
	utils.prototype.ProgressBar = function ProgressBar() {

		//vars
		this.load = 1;
		this.totalfiles;
		this.ui;
		this.flexSpace;
		this.action;

		var me = this;

		this.create = function(totalfiles,action) {

			me.totalfiles = totalfiles;
			me.action = action;

			try {
				if (Titanium.Platform.name == 'iPhone OS') {
					//create the UI for iPhone
					Titanium.API.info('creating ui of progress bar');

					this.flexSpace=Titanium.UI.createButton({
						systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
					});

					this.ui=Titanium.UI.createProgressBar({
						width:250,
						min:0,
						max:totalfiles,
						value:0,
						color:'#fff',
						message: action + ' 0 of '+ totalfiles,
						font: {
							fontSize:14,
							fontWeight:'bold'
						},
						style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN
					});

				}
				// create Android Progress Indicator
				else {
					// create indicator for Android
					this.ui = Titanium.UI.createActivityIndicator({
						location:Titanium.UI.ActivityIndicator.DIALOG,
						type:Titanium.UI.ActivityIndicator.DETERMINANT,
						message: action + ' 0 of '+ totalfiles,
						min:0,
						max:totalfiles,
						value:0
					});
				}
				//show
				this.ui.show();

				return true;
			} catch(e) {
				Titanium.API.info('creating progress bar error' + e.error);
				m.errorMessage.concat(e.error);
				m.errorDialog.show();
				return false;
			};
		};
		this.setProgressMessage  = function(action, load , totalfiles) {

			if(load)
				me.load = load;

			if (totalfiles)
				me.totalfiles = totalfiles;

			if (Titanium.Platform.name == 'iPhone OS') {
				me.ui.message = action + me.load + ' of '+ me.totalfiles;
			} else {
				//android
				me.ui.setMessage = action + me.load + ' of '+ me.totalfiles;
			}
		}
		//function to display the page progress
		this.setProgress  = function() {
			//check progress ?finished
			if(me.load === me.totalfiles) {
				//hide if true
				setTimeout( function() {
					me.hide();
					//raise that the action has finished
					var evt = 'sync_' + me.action +'Finished';
					Ti.App.fireEvent(evt);
					alert(me.action + ' of data finished :)')
				},2000);
			} else {
				if (Titanium.Platform.name == 'iPhone OS') {
					me.ui.value = me.load;
				} else {
					//android
					me.ui.setValue(me.load);
				};
				me.load++;
			}
		};
		/// function to show
		this.show = function() {
			me.ui.show();
		};
		this.hide = function() {
			me.ui.hide();
		};
	};
	//
	// function to save form data to model
	//
	utils.prototype.saveForm = function saveForm() {
		// //*** Public properties:
		/// this.var
		// //*** Protected variables:
		// var somevar = "";

		//get the active form
		var formObj =Ti.App.model.get_currentform();
		var dbrowid;

		Ti.API.debug(formObj);
		////if form has id then its an update else new form
		if(formObj.details.id === null)
		{
			dbrowid = db.prototype.insertNewForm(JSON.stringify(formObj), formObj.details.type,formObj.details.ver);
			formObj.details.id = dbrowid;
			Ti.App.model.set_currentform(formObj);
			Ti.App.utils.saveForm(); //simple save db test
		} else //needs updatig
		{
			db.prototype.updateForm(JSON.stringify(formObj) ,formObj.details.id);
		}
	};
	//
	// function to save form data to model
	//
	utils.prototype.submitForm = function submitForm() {
		// //*** Public properties:
		/// this.var
		// //*** Protected variables:
		// var somevar = "";
		var formObj =Ti.App.model.get_currentform();

		// //*** Protected method used only internally. Call with 'me.my_own()'
		// this.my_own = function (arg1) {
		// };
		//** PUBLIC METHODS ** //
		Ti.API.debug(formObj);
		db.prototype.submitForm(JSON.stringify(formObj) ,formObj.details.id);
	};
	///
	///	function to grab the users location via the gps
	///
	/// returns lat lng altidue object
	utils.prototype.getLocation = function getLocation() {
		Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;

		//
		//  SET DISTANCE FILTER.  THIS DICTATES HOW OFTEN AN EVENT FIRES BASED ON THE DISTANCE THE DEVICE MOVES
		//  THIS VALUE IS IN METERS
		//
		Titanium.Geolocation.distanceFilter = 5;

		//
		// GET CURRENT POSITION - THIS FIRES ONCE
		//
		Titanium.Geolocation.getCurrentPosition( function(e) {
			if (e.error) {
				alert('Cannot get your current location');
				return;
			}

			var myobj = {
				longitude : e.coords.longitude,
				latitude : e.coords.latitude,
				altitude : e.coords.altitude,
				heading : e.coords.heading,
				accuracy : e.coords.accuracy,
				speed : e.coords.speed,
				timestamp : e.coords.timestamp,
				altitudeAccuracy : e.coords.altitudeAccuracy
			}
			return myobj;
		});
	};
	///
	/// function to create map view
	///
	/// returns map view for win.
	utils.prototype.create_mapView = function create_mapView(lat, lng , title, subtitle) {

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
	utils.prototype.createMapWindow = function createMapWindow(_mapview) {
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
	

	// Array Remove - By John Resig (MIT Licensed)
	// // Remove the second item from the array
	// removeArrayItem(array,1);
	// // Remove the second-to-last item from the array
	// removeArrayItem(array,-2);
	// // Remove the second and third items from the array
	// removeArrayItem(array,1,2);
	// // Remove the last and second-to-last items from the array
	// removeArrayItem(array,-2,-1);
	utils.prototype.removeArrayItem = function removeArrayItem(array, from, to) {
	  var rest = array.slice((to || from) + 1 || array.length);
	  array.length = from < 0 ? array.length + from : from;
	  return array.push.apply(array, rest);
	};
	
	
	
	///
	///		Post FORM data to server
	///
	//		myurl =>http url for grab file (json)
	//		myobj =>object to load data in
	//		myfilename => file name to store for persistences
	utils.prototype.postFormData = function postFormData(SvrURL,progressBar,fn_callback) {
		var formObj =Ti.App.model.get_currentform();

		//check network if not do nothing
		if (me.checkNetwork()) {
			var xhr=Titanium.Network.createHTTPClient();
			xhr.setTimeout(40000);
			xhr.setRequestHeader("content-type", "application/json");
			
			// xhr.setRequestHeader(
    // 'Authorization', 
    // 'Basic ' + Ti.Utils.base64encode(username+':'+password));

			var param={ "data":formObj,"user": 'iainc' ,"deviceid": Ti.Platform.id , "version": formObj.details.ver ,"type": formObj.details.type };
			Ti.API.info('Params'+JSON.stringify(param));
			    
			xhr.onerror = function(e){ 
				Ti.API.error('Bad Sever =>'+e.error);
				m.errorMessage.concat(e.error);
				m.errorDialog.show();
			};
			 
			xhr.onload = function(){
			 Ti.API.info('RAW ='+this.responseText);
			 if(this.status == '200'){
			    Ti.API.info('got my response, http status code ' + this.status);
			    if(this.readyState == 4){
			      var response=JSON.parse(this.responseText);
			      Ti.API.info('Response = '+response);
			      //callback now
			      fn_callback();
			      
			    }else{
			      alert('HTTP Ready State != 4');
			    }           
			 }else{
			    alert('HTTp Error Response Status Code = '+this.status);
			    Ti.API.error("Error =>"+this.response);
			 }              
			};
			
			xhr.open("POST",SvrURL);//ADD your URL
			xhr.send(JSON.stringify(param));
			
		}; //end of check network
		};
		
		///
		/// set Prefs for application
		///
		utils.prototype.setPrefs = function setPrefs(key,obj)
		{
		// set props
		Ti.App.Properties.setString(key, JSON.stringify(obj));
		
		Ti.API.debug('debug app config key' + Ti.App.model.appConfig.CurrentUser);
		//if (Ti.App.model.appConfig[key])
		//Ti.App.model.appConfig[key] = JSON.stringify(obj);
		Ti.App.model.set_CurrentUser('test');
		};
		
		///
		/// get Prefs for application
		///
		utils.prototype.getPrefs = function getPrefs(key)
		{
		test = Ti.App.Properties.getString(key);
		if(test===null)
		{
			Ti.API.info("No Prefs file exists");
			return null;
		}else
		{
			Ti.API.info("Prefs file exists");
			var props = JSON.parse(Ti.App.Properties.getString(key));
			Ti.API.info('props details =>' + props);
			return props;
		}
		};

	//end of main function closure
}