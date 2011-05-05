///Ti.include('redux.js');

//Ti.includeAbsolute('/helpers/redux.js');
//if android

if (Ti.Platform.name === 'iPhone OS') {
Titanium.include('../models/m_app.js');
}else{
Titanium.include('/models/m_app.js');
}

///
//		Get Lookup data from server
///
//		myurl =>http url for grab file (json)
//		myobj =>object to load data in
//		myfilename => file name to store for persistences
function getLookupData(myurl,myobj,myfilename) {
	var myresult;
	var xhr2 = Titanium.Network.createHTTPClient();
	xhr2.onload = function() {
		Titanium.API.info('getting json for ' + myfilename + '@ ' + myurl );
		try {
			myobj = JSON.parse(this.responseText);
		} catch(e) {
			m.errorDialog.message = e.error;
			m.errorDialog.show();
		}
		//Titanium.API.info(myobj);
		///do something with data.
		saveLookupFiles(myfilename,myobj);
	};
	xhr2.onerror = function(e) {
		Ti.API.error('error getting data' + e.error);
		m.errorDialog.message = e.error;
		m.errorDialog.show();
	};
	xhr2.open("GET",myurl);
	xhr2.send();
};

///
//		Save Lookup data from server to device
///
//		myobj =>object to load data in
//		myfilename => file name to store for persistences
function saveLookupFiles(myfilename,myobj) {
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
		m.errorDialog.message = e.error;
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
function readLookupFiles(myfilename,myobj,fn_callback) {
	try {
		Titanium.API.info('starting reading files');
		var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'LookupData');
		appDir.createDirectory();
		Titanium.API.info(appDir.nativePath);
		var f = Titanium.Filesystem.getFile(appDir.nativePath,myfilename);
		Titanium.API.info(f.nativePath);
		m.mymetertypes = JSON.parse(f.read().text);
		Titanium.API.info('file read');
		Titanium.API.info('calling callback with ' + myobj);
		fn_callback(myobj);
	} catch(e) {
		Titanium.API.info('reading file lookups error' + e.error);
		m.errorDialog.message = e.error;
		m.errorDialog.show();
		fn_callback(myobj);
	}
};