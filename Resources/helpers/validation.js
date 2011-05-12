
//UI for valiation
var imgPath=Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,"images/bubble.png");

var valView =  Titanium.UI.createView({
width:205,
height:30,
backgroundColor: '#1A75A2',
borderRadius:10,
	opacity:0.7,
	touchEnabled:false,
		//backgroundImage: "images/bubble.png",
top:2,
left:50
});

Ti.API.info(valView.backgroundImage);

var valLabel =  Titanium.UI.createLabel({
text:'Error in field (see red)',
color:'#fff',
width:205,
height:'auto',
font:{
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
	}
	return false;
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


var isValid=null; 

function checkValidation(obj) {
	Titanium.API.info('checking validation');
	//clear validation
	obj.color = obj.validation.color;
	
	//keep record of validation colors
	if(!obj.validation.color)
		obj.validation.color = obj.color;
		
	
	//set valuation highlight effect
	function setEffect(obj,isOff)
	{
		if (isValid===false)
		{
			return false;
		}else
		{
		if(!isOff){
		obj.color = 'Red';
		isValid = false;
		}
		if(isOff){
		obj.color = obj.validation.color;
		isValid = true;
		}
		}
		return isOff;
	};

	//check if reqd
	if(obj.validation.reqd)
	{
		setEffect(obj,isPresent(obj.value));
	};
	
	///validation checks only if Value Present
	if(isPresent(obj.value))
	{
	//check for double value
	if(obj.validation.isdouble) { 
		setEffect(obj,isReal(obj.value));
	}
	//check if need integer
	if(obj.validation.isinteger) {
		if (!setEffect(obj,isInteger(obj.value)))
			obj.value = removeLastEntry(obj.value);
	};
	//check if need min 
	if(obj.validation.minchars) {
		setEffect(obj,isMinChars(obj.value,obj.validation.minchars));
	};
	//check if max
	if(obj.validation.maxchars) {
		if(!setEffect(obj,isWithinMaxChars(obj.value,obj.validation.maxchars)))
		obj.value = removeLastEntry(obj.value);
	};
	//check within range
	if(obj.validation.range)
	{
		setEffect(obj,isWithinRange(obj.value,obj.validation.range.min,obj.validation.range.max));
	};
	};
	
	Ti.API.info('isValid:' + isValid);	
	return isValid;
};

	
// //test valid date => returns bool
// function isValidDate (dateStr, format) {
	// if (format == null) {
		// format = "MDY";
	// }
	// format = format.toUpperCase();
	// if (format.length != 3) {
		// format = "MDY";
	// }
	// if ( (format.indexOf("M") == -1) || (format.indexOf("D") == -1) || _
	// (format.indexOf("Y") == -1) ) {
		// format = "MDY";
	// }
	// if (format.substring(0, 1) == "Y") { // If the year is first
		// var reg1 = /^\d{2}(\-|\/|\.)\d{1,2}\1\d{1,2}$/
		// var reg2 = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/
	// } else if (format.substring(1, 2) == "Y") { // If the year is second
		// var reg1 = /^\d{1,2}(\-|\/|\.)\d{2}\1\d{1,2}$/
		// var reg2 = /^\d{1,2}(\-|\/|\.)\d{4}\1\d{1,2}$/
	// } else { // The year must be third
		// var reg1 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{2}$/
		// var reg2 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/
	// }
	// // If it doesn't conform to the right format (with either a 2 digit year or 4 digit year), fail
	// if ( (reg1.test(dateStr) == false) && (reg2.test(dateStr) == false) ) {
		// return false;
	// }
	// var parts = dateStr.split(RegExp.$1); // Split into 3 parts based on what the divider was
	// // Check to see if the 3 parts end up making a valid date
	// if (format.substring(0, 1) == "M") {
		// var mm = parts[0];
	// } else _
	// if (format.substring(1, 2) == "M") {
		// var mm = parts[1];
	// } else {
		// var mm = parts[2];
	// }
	// if (format.substring(0, 1) == "D") {
		// var dd = parts[0];
	// } else _
	// if (format.substring(1, 2) == "D") {
		// var dd = parts[1];
	// } else {
		// var dd = parts[2];
	// }
	// if (format.substring(0, 1) == "Y") {
		// var yy = parts[0];
	// } else _
	// if (format.substring(1, 2) == "Y") {
		// var yy = parts[1];
	// } else {
		// var yy = parts[2];
	// }
	// if (parseFloat(yy) <= 50) {
		// yy = (parseFloat(yy) + 2000).toString();
	// }
	// if (parseFloat(yy) <= 99) {
		// yy = (parseFloat(yy) + 1900).toString();
	// }
	// var dt = new Date(parseFloat(yy), parseFloat(mm)-1, parseFloat(dd), 0, 0, 0, 0);
	// if (parseFloat(dd) != dt.getDate()) {
		// return false;
	// }
	// if (parseFloat(mm)-1 != dt.getMonth()) {
		// return false;
	// }
	// return true;
// }
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

// //test valid time => return bool
// // valid entries 12:25 & 12:25PM
// function isValidTime(value) {
	// var hasMeridian = false;
	// var re = /^\d{1,2}[:]\d{2}([:]\d{2})?( [aApP][mM]?)?$/;
	// if (!re.test(value)) {
		// return false;
	// }
	// if (value.toLowerCase().indexOf("p") != -1) {
		// hasMeridian = true;
	// }
	// if (value.toLowerCase().indexOf("a") != -1) {
		// hasMeridian = true;
	// }
	// var values = value.split(":");
	// if ( (parseFloat(values[0]) < 0) || (parseFloat(values[0]) > 23) ) {
		// return false;
	// }
	// if (hasMeridian) {
		// if ( (parseFloat(values[0]) < 1) || (parseFloat(values[0]) > 12) ) {
			// return false;
		// }
	// }
	// if ( (parseFloat(values[1]) < 0) || (parseFloat(values[1]) > 59) ) {
		// return false;
	// }
	// if (values.length > 2) {
		// if ( (parseFloat(values[2]) < 0) || (parseFloat(values[2]) > 59) ) {
			// return false;
		// }
	// }
	// return true;
// }
// 