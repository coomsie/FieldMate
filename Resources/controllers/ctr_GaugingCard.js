//Ti.includeAbsolute('/helpers/redux.js');
Titanium.include('../models/m_app.js');
///read river data

// url http://tools.ecan.govt.nz/DataCatalogue/data/Water/Gauging%20Sites/JSON

// function getRiverData(){
// var data;
// try{
// Titanium.API.info('grab file');
// var rDir = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'StaticData');
// var f = Titanium.Filesystem.getFile(rDir.nativePath,'Sites.json');
// data = JSON.parse(f.read().text);
// Titanium.API.info(data.data.item[0].River);
// }
// catch(e)
// {
//
// }
// }
//
// getRiverData();

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
		Titanium.API.info(myobj);
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

function readLookupFiles(myfilename) {
	var myobj;
	try {
		Titanium.API.info('starting reading files');
		var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'LookupData');
		appDir.createDirectory();
		var f = Titanium.Filesystem.getFile(appDir.nativePath,myfilename);
		myobj = JSON.parse(f.read().text);
		Titanium.API.info('file read');
		return myobj;
	} catch(e) {
		Titanium.API.info('reading file lookups error' + e.error);
		m.errorDialog.message = e.error;
		m.errorDialog.show();
		return myobj;
	}
};