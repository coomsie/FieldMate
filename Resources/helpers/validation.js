//UI for valiation
var imgPath=Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,"images/bubble.png");

// 
// var messageWin = Titanium.UI.createWindow({
	// height:57,
	// width:205,
	// top:50,
	// touchEnabled:false,
	// orientationModes : [
	// Titanium.UI.PORTRAIT
	// ]
// });

var valView =  Titanium.UI.createView({
	width:250,
	height:30,
	backgroundColor:'Red',
	borderRadius:10,
	opacity:0.7,
	touchEnabled:false,
	visible:false,
	//backgroundImage: "images/bubble.png",
	top:2,
	left:35
});

Ti.API.info(valView.backgroundImage);

var valLabel =  Titanium.UI.createLabel({
	text:'Missing or error in field (see red text)',
	color:'#fff',
	width:250,
	height:'auto',
	font: {
		fontFamily:'Helvetica Neue',
		fontSize:13,
		fontWeight:'bold'
	},
	textAlign:'center'
});

valView.add(valLabel);

var anim_out = Titanium.UI.createAnimation();
anim_out.opacity=0;
anim_out.duration = 4000;

//function to display view
function displayValErr()
{
    valView.visible = true;
	valView.opacity =.7;
	valView.show();
	valView.animate(anim_out);
	setTimeout(function()
			{
				//for fading out error tip and closing
				valView.hide();
				//messageWin.close({opacity:0,duration:500});
			},4000);
	}

//test is Valid Number => returns bool
function isValidNumber(val) {
	var re=/^[-+]?\d+(\.\d+)?$/;
	Titanium.API.debug('isValidNumber:' + re.test(val));
	return re.test(val);
};

//test for integer
function isInteger(val) {
	var re= /^[-+]?\d+$/;
	Titanium.API.debug('isInteger:' + re.test(val));
	return re.test(val);
}

//function to test double **** maynot be correct ***
function isDouble(val){
	var re = new RegExp("[0-9.]");
	Titanium.API.debug('isDouble:' + re.test(val));
	return re.test(val);
}

function isNumber(val) { // REAL NUMBERS
	var re = new RegExp("/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/");
	Titanium.API.debug('isNumber:' + re.test(val));
return re.test(val);
}

//test for real val
function isReal(val) {
	var re =/^[-+]?\d*\.?\d+$/;
	Titanium.API.debug('isReal:' + re.test(val));
	return re.test(val);
}

function removeLastEntry(val) {
	Titanium.API.debug('removeLastEntry:');
	return  val.slice(0,val.toString().length-1);
};

//test for empty
// check to see if input is whitespace only or empty
function isEmpty( val ) {
	if ( null === val || "" === val ) {
		return true;
	} else {
		return false;
	}
}

//test if reqd
function isPresent(val) {
	var re = /[^.*]/;
	Titanium.API.debug('isPresent:' + re.test(val));
	return re.test(val);
}

//check for value in range
// check to see if value is within min and max
function isWithinRange(val, min, max) {
	if (val >= min && val <= max) {
		Titanium.API.debug('isWithinRange:true');
		return true;
	} else {
		Titanium.API.debug('isWithinRange:false');
		return false;
	}
}

// check to see if value is within min chars
function isMinChars(val, min) {
	if (val.toString().length >= min) {
		Titanium.API.debug('isMinChars:true');
		return true;
	} else {
		Titanium.API.debug('isMinChars:false');
		return false;
	}
}

// check to see if value is within max chars
function isWithinMaxChars(val, max) {
	if (val.toString().length <= max) {
		Titanium.API.debug('isWithinMaxChars:true');
		return true;
	} else {
		Titanium.API.debug('isWithinMaxChars:false');
		return false;
	}
}

function checkValidation(obj) {
	var isValid=null;
	Titanium.API.info('checking validation');
	//clear validation
	obj.color = obj.validation.color;

	//keep record of validation colors
	if(!obj.validation.color){
		obj.validation.color = obj.color;
		obj.validation.backgroundColor = obj.backgroundColor;
		}
	//set valuation highlight effect
	function setEffect(obj,isOff) {
		if (isValid===false) {
			return false;
		} else {
			if(!isOff) {
				obj.color = 'Red';
				obj.backgroundColor = 'Red';
				isValid = false;
			}
			if(isOff) {
				obj.color = obj.validation.color;
				obj.backgroundColor = obj.validation.backgroundColor;
				isValid = true;
			}
		}
		return isOff;
	};

	//check if reqd
	if(obj.validation.reqd) {
		setEffect(obj,isPresent(obj.value));
	};

	///validation checks only if Value Present
	if(isPresent(obj.value)) {
		//check for double value
		if(obj.validation.isdouble) {
			setEffect(obj,isDouble(obj.value));
		};
		//check if need integer
		if(obj.validation.isinteger) {
			setEffect(obj,isInteger(obj.value));
			// if (!setEffect(obj,isInteger(obj.value)))
				// obj.value = removeLastEntry(obj.value);
		};
		//check if need min
		if(obj.validation.minchars) {
			setEffect(obj,isMinChars(obj.value,obj.validation.minchars));
		};
		//check if max
		if(obj.validation.maxchars) {
			setEffect(obj,isWithinMaxChars(obj.value,obj.validation.maxchars));
			// removed next cos the check still returns false ....
			// if(!isWithinMaxChars(obj.value,obj.validation.maxchars))
			// {
				// obj.value = removeLastEntry(obj.value);
				// checkValidation(obj);
			// }
		};
		//check within range
		if(obj.validation.range) {
			setEffect(obj,isWithinRange(obj.value,obj.validation.range.min,obj.validation.range.max));
		};
	};

	Ti.API.info('isValid:' + isValid);
	return isValid;
};


//
// //test valid email address => returns bool
// function isValidEmail(emailAddress) {
// var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(2([0-4]\d|5[0-5])|1?\d{1,2})(\.(2([0-4]\d|5[0-5])|1?\d{1,2})){3} \])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// return re.test(emailAddress);
// }
//

//
// //test is alpha
// function isAlpha(val) {
// var re = /^[a-z ._-]+$/i
// return re.test(val);
// }
//
// //test alphas numercial
// function isAlphaNum(val) {
// var re = /^[a-z0-9 ._-]+$/i
// return re.test(val);
// }

// //test for phone
// function isPhone(val) {
// var re = /^[\d\s ().-]+$/
// return re.test(val);
// }
//

// //test for url
// function isUrl(val) {
// var re  = /^(http|https|ftp)\:\/\/[a-z0-9\-\.]+\.[a-z]{2,3}(:[a-z0-9]*)?\/?([a-z0-9\-\._\?\,\'\/\\\+&amp;%\$#\=~])*$/i
// return re.test(val);
// }
