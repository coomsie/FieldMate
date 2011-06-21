//UI for valiation

function validationMessages() {

	//*** 'me' acts as an alias that can be used within the methods
	var me = this;
	var imgPath=Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,"images/bubble.png");

	validationMessages.totalErrors =0;
	validationMessages.reqdfieldsRemaining=0;

	this.messageWin = Titanium.UI.createWindow({
		height: 50,
		width:310,
		top:40,
		touchEnabled:false,
		visible:true,
		zIndex: 999
	});

	this.valView =  Titanium.UI.createView({
		width:310,
		height:50,
		//backgroundColor:'Red',
		//borderRadius:10,
		opacity:1.0,
		touchEnabled:false,
		visible:false,
		backgroundImage: imgPath.nativePath
		//left:35
	});

	this.valLabel =  Titanium.UI.createLabel({
		text:'Missing or error in field (see red text)',
		color:'#fff',
		width:300,
		height:50,
		top:2,
		font: {
			fontFamily:'Helvetica Neue',
			fontSize:16,
			fontWeight:'bold'
		},
		textAlign:'center'
	});

	this.valView.add(this.valLabel);

	this.messageWin.add(this.valView);

	this.anim_out = Titanium.UI.createAnimation();
	this.anim_out.opacity=0;
	this.anim_out.duration = 4000;

	//function to display view
	validationMessages.prototype.displayValErr  = function displayValErr() {
		this.valView.opacity = 1.0;
		this.valView.visible = true;
		this.valView.show();
		this.messageWin.open();
		this.valView.animate(this.anim_out);
		// setTimeout(function()
		// {
		// //for fading out error tip and closing
		// this.valView.hide();
		// //messageWin.close({opacity:0,duration:500});
		// },4000);
	}
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
function isDouble(val) {
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

var rules = {};

function setValidationRules(val) {
	rules = val;
}

//get valid rule from rules of field obj
function getRule(id) {
	var r;
	for (var i = rules.length - 1; i >= 0; i--) {
		///Ti.API.debug('rule' + i + rules[i]);
		if (rules[i].hasOwnProperty(id))
			r = rules[i][id]; //use  bracket notatio when dynamic
	};
	return r;
}

function checkValidation(obj , fieldid) {
	var isValid=null;
	Ti.API.debug('fieldid'+fieldid);

	if(fieldid === undefined)
		fieldid = obj.id;

	var objRule = getRule(fieldid) //get rule for object

	//if no rule then do nothing
	if (objRule !== undefined) {
		Ti.API.debug('the rules' + objRule);
		for(var key in objRule) {
			Ti.API.debug(key);
		}

		Titanium.API.info('checking validation');
		//clear validation
		obj.color = obj.validation.color;

		//keep record of validation colors
		if(!obj.validation.color) {
			obj.validation.color = obj.color;
			obj.validation.backgroundColor = obj.backgroundColor;
		}
		//set valuation highlight effect
		function setEffect(obj,isOff) {
			if (isValid===false) {
				return false;
			} else {
				if(!isOff) {
					if (obj.color !== 'undefined') {
						obj.color = 'Red';
						obj.backgroundColor = 'Red';
					}
					isValid = false;
				}
				if(isOff) {
					if (obj.color !== 'undefined') {
						obj.color = obj.validation.color;
						obj.backgroundColor = obj.validation.backgroundColor;
					}
					isValid = true;
				}
			}
			return isOff;
		};

		//run engine check if field of the whole form
		validationEngine(obj, objRule);

		function validationEngine(obj , objRule) {
			//check if reqd
			if(objRule.reqd) {
				setEffect(obj,isPresent(obj.value));
			};

			///validation checks only if Value Present
			if(isPresent(obj.value)) {
				//check for double value
				if(objRule.isdouble) {
					setEffect(obj,isDouble(obj.value));
				};
				//check if need integer
				if(objRule.isinteger) {
					setEffect(obj,isInteger(obj.value));
					// if (!setEffect(obj,isInteger(obj.value)))
					// obj.value = removeLastEntry(obj.value);
				};
				//check if need min
				if(objRule.minchars) {
					setEffect(obj,isMinChars(obj.value,objRule.minchars));
				};
				//check if max
				if(objRule.maxchars) {
					setEffect(obj,isWithinMaxChars(obj.value,objRule.maxchars));
					// removed next cos the check still returns false ....
					// if(!isWithinMaxChars(obj.value,obj.validation.maxchars))
					// {
					// obj.value = removeLastEntry(obj.value);
					// checkValidation(obj);
					// }
				};
				//check within range
				if(objRule.range) {
					setEffect(obj,isWithinRange(obj.value,objRule.range.min,objRule.range.max));
				};
			};
		};

	}; //if rule

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

//validation model
var validator = {
	rules: {
		spintestbefore: {
			isdouble:false,
			isinteger:true,
			range: {
				min:0,
				max:100
			},
			minchars:1,
			maxchars:3,
			reqd:true
		},
		spintestafter: {
			isdouble:false,
			isinteger:true,
			range: {
				min:0,
				max:100
			},
			minchars:1,
			maxchars:3,
			reqd:true
		},
		measured: {
			isdouble:false,
			isinteger:true,
			range: {
				min:0,
				max:200
			},
			minchars:1,
			maxchars:3,
			reqd:true
		},
		wind: {
			isdouble:false,
			isinteger:true,
			range: {
				min:0,
				max:99
			},
			minchars:1,
			maxchars:2,
			reqd:true
		},
		current: {
			isdouble:false,
			isinteger:true,
			range: {
				min:0,
				max:200
			},
			minchars:1,
			maxchars:3,
			reqd:true
		},
		temp: {
			isdouble:true,
			isinteger:false,
			range: {
				min:-10,
				max:35
			},
			minchars:1,
			maxchars:5,
			reqd:true
		}
	},
	messages: {
		isinteger: {
			eval: "Value must be an integer"
		},
		isdouble: {
			eval: "Value must be an integer"
		},
		minchars: {
			eval: "Value doesnt meet the min character(s) required"
		},
		maxchars: {
			eval: "Value doesnt meet the max character(s) required"
		},
		maxrange: {
			eval: "Value is more the max allowed"
		},
		minrange: {
			eval: "Value is less the min allowed"
		}
	}
}; ///end of function

///jqueries validation model
// validator = $("form").validate({
// errorClass: "validator",
// //            errorPlacement: function(error, element) {
// //                // Custom placement for meters radio buttons
// //                if ($(element).is('#Meters input:radio')) {
// //                    element = $("#Meters");
// //                    error.insertAfter(element);
// //                }
// //                else {
// //                    element = $(element).parent();
// //                    error.appendTo(element);
// //                }
// //            },
// rules: {
// wellNo: {
// required: true,
// wellNoValid: true
// },
// coordinateSystem: {
// eval: "viewModel.coordinateSystem().id != null ? true : false"
// },
// y: {
// required: true,
// number: true
// },
// x: {
// required: true,
// number: true
// },
// coordinateQuality: {
// eval: "viewModel.coordinateQuality().id != null ? true : false"
// },
// drillMethod: {
// eval: "viewModel.drillMethod().id != null ? true : false"
// },
// drillDate: {
// required: true,
// dateITA: true,
// dateNonFuture: true
// },
// diameter: {
// required: true,
// digits: true
// },
// casingMaterial: {
// eval: "viewModel.casingMaterial().id != null ? true : false"
// },
// casingMaterialOther: {
// requiredWhenVisible: "viewModel.casingMaterialId() == casingMaterialsOtherId ? true : false"
// },
// initialGWL: {
// required: true,
// number: true
// },
// groundRL: {
// number: true
// },
// screensOverlap: {
// eval: "!viewModel.screensOverlapsPresent()"
// },
// strataCount: {
// eval: "viewModel.strata().length >= 1 ? true : false"
// },
// strataOverlap: {
// eval: "!viewModel.strataOverlapsPresent()"
// },
// // SCREEN START
// screenMaterial: {
// eval: "viewModelScreen.screenMaterial().id != null ? true : false"
// },
// screenTop: {
// required: true,
// number: true
// },
// screenBottom: {
// required: true,
// number: true,
// eval: "parseFloat(viewModelScreen.screenBottom()) >= parseFloat(viewModelScreen.screenTop()) ? true : false"
// },
// slotSize: {
// digits: true
// },
// slotLength: {
// digits: true
// },
// screenDiameter: {
// digits: true
// },
// leaderLength: {
// digits: true
// },
// screenLength: {
// digits: true
// },
// // SCREEN END
// // STRATUM START
// depth: {
// required: true,
// number: true
// },
// waterContent: {
// eval: "viewModelStratum.waterContent().id != null ? true : false"
// },
// colour: {
// eval: "viewModelStratum.colour().id != null ? true : false"
// },
// majorFraction: {
// eval: "viewModelStratum.majorFraction().id != null ? true : false"
// },
// waterLevel: {
// digits: true
// }
// // STRATUM END
// },
// messages: {
// screensOverlap: {
// eval: "Screens cannot overlap"
// },
// strataCount: {
// eval: "At least 1 stratum required"
// },
// strataOverlap: {
// eval: "Strata cannot share the same depth"
// },
// screenBottom: {
// eval: "Bottom must be deeper than top"
// }
// }
// });