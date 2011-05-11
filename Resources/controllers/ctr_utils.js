function utils() {

	//*** 'me' acts as an alias that can be used within the methods
	var me = this;

	// //*** Public properties:

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
	utils.prototype.getLookupData = function getLookupData(myurl,myobj,myfilename,progressBar,fn_callback) {
		//check network if not do nothing
		if (me.checkNetwork()) {
			//start progress bar
			if(progressBar) progressBar.setProgressMessage('Downloading ' + myfilename +' ');
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
				if(progressBar) progressBar.setProgress();
				fn_callback();
			};
			xhr2.onerror = function(e) {
				Ti.API.error('error getting data' + e.error);
				m.errorMessage.concat(e.error);
				m.errorDialog.show();
				if(progressBar) progressBar.hide();
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
			f.write(JSON.stringify(myobj));
			Titanium.API.info('file written');
			if(progressBar) progressBar.setProgressMessage('Written file ' + myfilename +' ');
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
			//m.mymetertypes = JSON.parse(f.read().text);
			Titanium.API.info('file read');
			Titanium.API.info('calling callback with ' + this.myobj);
			fn_callback(this.myobj);
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

		var me = this;

		this.create = function(totalfiles) {

			me.totalfiles = totalfiles;
			
			try {
				if (Titanium.Platform.name == 'iPhone OS')
				{		
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
					message:'Downloading 0 of '+ totalfiles,
					font: {
						fontSize:14,
						fontWeight:'bold'
					},
					style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN
				});

				}
				// create Android Progress Indicator
				else
				{
				// create indicator for Android
				this.ui = Titanium.UI.createActivityIndicator({
					location:Titanium.UI.ActivityIndicator.DIALOG,
					type:Titanium.UI.ActivityIndicator.DETERMINANT,
					message:'Downloading 0 of '+ totalfiles,
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
		
		this.setProgressMessage  = function(action) {
			if (Titanium.Platform.name == 'iPhone OS')
				{	
					me.ui.message = action + me.load + ' of '+ me.totalfiles;
				}else{
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
					alert('Sync finished :)')
				},2000);
			} else {
				if (Titanium.Platform.name == 'iPhone OS')
				{
					me.ui.value = me.load;
				}else{
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
	utils.prototype.saveForm = function saveForm(formtype,ctrl,ctrlname) {
	
	
	// //*** Public properties:
	/// this.var
	// //*** Protected variables:
	// var somevar = "";
	var formObj;
	
	// //*** Protected method used only internally. Call with 'me.my_own()'
	// this.my_own = function (arg1) {
	// };
	

	//** PUBLIC METHODS ** //
	
	//get the active model
	//update the field if valid
	
	this.readFiles('m_' + formtype +'.json',formObj,setValues,'models','res');
	
	function setValues(obj){
		// for (var i = obj.length - 1; i >= 0; i--){
		// if(obj[i] === ctrlname)
		// obj[i]
		// };
		formObj = obj;
		Ti.API.debug(formObj);
		formObj.spinbefore = '222' //ctrl.value.toString();
		Ti.API.debug(formObj.spinbefore);
		Ti.API.debug(formObj);
		db.prototype.insertNewForm(JSON.stringify(formObj), formtype,'1.01','Upstream Council Intake');
	
	}
	
	};
	
	//end of main function closure
}