function utils() {

	//*** 'me' acts as an alias that can be used within the methods
	var me = this;
	// //*** Public properties:
	// this.version = 1.0;
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
	utils.prototype.getLookupData = function getLookupData(myurl,myobj,myfilename) {
		//check network if not do nothing
		if (me.checkNetwork()) {
			var myresult;
			var xhr2 = Titanium.Network.createHTTPClient();
			xhr2.setTimeout(30000);
			xhr2.onload = function() {
				Titanium.API.info('getting json for ' + myfilename + '@ ' + myurl );
				try {
					myobj = JSON.parse(this.responseText);
				} catch(e) {
					m.errorMessage.concat(e.error);
					m.errorDialog.show();
				}
				//Titanium.API.info(myobj);
				///do something with data.
				me.saveLookupFiles(myfilename,myobj);
			};
			xhr2.onerror = function(e) {
				Ti.API.error('error getting data' + e.error);
				m.errorMessage.concat(e.error);
				m.errorDialog.show();
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
	utils.prototype.saveLookupFiles = function saveLookupFiles(myfilename,myobj) {
		try {
			Titanium.API.info('starting saving files');
			var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'LookupData');
			appDir.createDirectory();
			var f = Titanium.Filesystem.getFile(appDir.nativePath,myfilename);
			f.write(JSON.stringify(myobj));
			Titanium.API.info('file written');
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
		try {
			Titanium.API.info('starting reading files');
			var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'LookupData');
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
		try {
			Titanium.API.info('starting checking for files');
			var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'LookupData');
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
	//end of main function closure
}