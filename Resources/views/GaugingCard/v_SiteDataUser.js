var win = Titanium.UI.currentWindow;

var picker = Ti.UI.createPicker();

var data = [];
data[0]=Ti.UI.createPickerRow({title:'Phil Downes',custom_item:'b'});
data[1]=Ti.UI.createPickerRow({title:'Pete Mayall',custom_item:'s'});
data[2]=Ti.UI.createPickerRow({title:'Ross Everest',custom_item:'m'});
data[3]=Ti.UI.createPickerRow({title:'Martin Webb',custom_item:'g'});
data[4]=Ti.UI.createPickerRow({title:'Julie Blyth',custom_item:'g'});
data[5]=Ti.UI.createPickerRow({title:'Iain Campion',custom_item:'g'});
data[6]=Ti.UI.createPickerRow({title:'Alex ..',custom_item:'g'});



// turn on the selection indicator (off by default)
picker.selectionIndicator = true;

picker.add(data);

win.add(picker);

var label = Ti.UI.createLabel({
	text:'select yourself',
	top:6,
	width:'auto',
	height:'auto',
	textAlign:'center',
	color:'white'
});
win.add(label);
