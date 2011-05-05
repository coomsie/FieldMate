//Ti.include('redux.js');

m = {};

m.sites = '';

m.mymetertypes = new Object;



m.appConfig = {
	ApplicationName: 'FieldMate',
	ApplicationServerURL: 'http://tools.ecan.govt.nz/FieldMate/',
	DeveloperEmail:'iain.campion@ecan.govt.nz',
	FormModels: [],
	LookupURLS: [
	{FileName:'stagedreadings.json', URL:'http://tools.ecan.govt.nz/DataCatalogue/data/Water/Stage%20Readings/JSON'},
	{FileName:'sites.json', URL:'http://tools.ecan.govt.nz/DataCatalogue/data/Water/Gauging%20Sites/JSON'},
	{FileName:'metertypes.json', URL:'http://tools.ecan.govt.nz/DataCatalogue/data/Water/Gauging%20Meter%20Types/JSON'}
	]
}

m.errorDialog = Titanium.UI.createAlertDialog({
	title: ':( Error - send to creator',
	message: '',
	buttonNames: ['OK','Cancel']
});

m.errorMessage = 'ERROR DETAILS<br /><br /><br />APP CONFIG/MODEL<br />' + JSON.stringify(m) + '<br /><br /><br /> LOG FILE';



//error handling

m.errorDialog.addEventListener('click', function() {
	var emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.setSubject(m.appConfig.ApplicationName + ' error');
	emailDialog.setToRecipients([m.appConfig.DeveloperEmail]);
	
	var f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,Ti.App.guid + '.log');
	
	if (Ti.Platform.name == 'iPhone OS') {
		//emailDialog.setMessageBody(m.errorDialog.message);
		
		emailDialog.setMessageBody(m.errorMessage.concat(f.read().text,'<br /><br /><br />'));
		emailDialog.setHtml(true);
		emailDialog.setBarColor('#336699');
	} else {
		//emailDialog.setMessageBody(m.errorDialog.message);
		emailDialog.setMessageBody(m.errorMessage.concat(f.read().text,'<br /><br /><br />'));
	}

	// attach a file
	//var f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,Ti.App.guid + '.log');
	
	//emailDialog.addAttachment(f);

	emailDialog.addEventListener('complete', function(e) {
		if (e.result == emailDialog.SENT) {
			if (Ti.Platform.osname !== 'android') {
				// android doesn't give us useful result codes.
				// it anyway shows a toast.
				///alert("message was sent");
			}
		} else {
			alert("message was not sent. " + e.result);
		}
	});
	emailDialog.open();
});
