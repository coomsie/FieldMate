m = {};

m.sites = '';
m.url = 'http://tools.ecan.govt.nz/DataCatalogue/data/Water/Gauging%20Sites/JSON';

m.errorDialog = Titanium.UI.createAlertDialog({
	title: ':( Error - send to creator',
	message: '',
	buttonNames: ['OK','Cancel']
});




//error handling

m.errorDialog.addEventListener('click', function() {
	var emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.setSubject('FieldMate error');
	emailDialog.setToRecipients(['iain.campion@ecan.govt.nz']);

	if (Ti.Platform.name == 'iPhone OS') {
		emailDialog.setMessageBody(m.errorDialog.message);
		emailDialog.setHtml(true);
		emailDialog.setBarColor('#336699');
	} else {
		emailDialog.setMessageBody(m.errorDialog.message);
	}

	// attach a file
	var f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,Ti.App.guid + '.log');
	emailDialog.addAttachment(f);

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
