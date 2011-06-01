function model() {

	//*** 'me' acts as an alias that can be used within the methods
	var me = this;
	var currentform = null; ///load the current form in use here.

	// //*** Public properties:
	this.set_currentform  = function set_currentform(v)
	{
		//Ti.API.info(v);
		currentform = v;
		//Ti.API.info(currentform);
	}
	this.get_currentform = function () { 
		return currentform };
		
	this.mysites = new Object;
	this.mymetertypes;//= new Object;
	this.appConfig = {
		ApplicationName: 'FieldMate',
		ApplicationServerURL: 'http://tools.ecan.govt.nz/FieldMate/',
		CurrentUser: 'Phil Downes',
		DeveloperEmail:'iain.campion@ecan.govt.nz',
		FormModels: [{formname:'GaugingCard'}],
		LookupFilesUpdated: '',
		LookupURLS: [{
			FileName:'sites.json',
			URL:'http://tools.ecan.govt.nz/DataCatalogue/data/Water/Gauging%20Sites/JSON'
		}
		,{
			FileName:'metertypes.json',
			URL:'http://tools.ecan.govt.nz/DataCatalogue/data/Water/Gauging%20Meter%20Types/JSON'
		}
		,{
			FileName:'stagedreadings.json',
			URL:'http://tools.ecan.govt.nz/DataCatalogue/data/Water/Stage%20Readings/JSON'
		},
		{
			FileName:'gaugingstdcomments.json',
			URL:'http://tools.ecan.govt.nz/DataCatalogue/data/Water/Gauging%20Std%20Comments/JSON'
		}
		]
	};

	//error std dialog
	this.errorDialog = Titanium.UI.createAlertDialog({
		title: ':( Error - send to creator',
		message: '',
		buttonNames: ['OK','Cancel']
	});

	this.errorMessage = 'ERROR DETAILS<br /><br /><br />APP CONFIG/MODEL<br />' + JSON.stringify(me) + '<br /><br /><br /> LOG FILE';

	//error handling
	this.errorDialog.addEventListener('click', function() {
		var emailDialog = Titanium.UI.createEmailDialog();
		emailDialog.setSubject(me.appConfig.ApplicationName + ' error');
		emailDialog.setToRecipients([me.appConfig.DeveloperEmail]);

		var f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,Ti.App.guid + '.log');

		if (Ti.Platform.name == 'iPhone OS') {
			//emailDialog.setMessageBody(m.errorDialog.message);

			emailDialog.setMessageBody(me.errorMessage.concat(f.read().text,'<br /><br /><br />'));
			emailDialog.setHtml(true);
			emailDialog.setBarColor('#336699');
		} else {
			//emailDialog.setMessageBody(m.errorDialog.message);
			emailDialog.setMessageBody(me.errorMessage.concat(f.read().text,'<br /><br /><br />'));
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
	// //*** Protected variables:
	// var somevar = "";
	// //*** Protected method used only internally. Call with 'me.my_own()'
	// this.my_own = function (arg1) {
	// };

	//** PUBLIC METHODS ** //

	//end of closure
};