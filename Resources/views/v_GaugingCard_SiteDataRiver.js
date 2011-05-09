var win = Titanium.UI.currentWindow;

var data = [
			{title:'SH1 Bridge (Recorder)', header:'Ashburton River',siteid:68801,mapref:'K37:09622-97609'},
{title:'SH1 Bridge', header:'Ashley River',siteid:66201,mapref:'M35:847-698'},
{title:'Gorge (Recorder)',siteid:66204,mapref:'L34:464-749'},
{title:'Rangiora Traffic Bridge (Recorder)',siteid:66214,mapref:'M35:76266-69339'},
{title:'Gloucester Street Bridge (Recorder)', header:'Avon River',siteid:66602,mapref:'M35:80450-41895'},
{title:'SH83', header:'Awakino River',siteid:71105,mapref:'I40:0715-0872'},
{title:'Upstream Council Intake (Recorder)', header:'Aylmers Stream',siteid:67402,mapref:'N37:07560-09439'},
{title:'Arthurs Pass', header:'Bealey River',siteid:66419,mapref:'K33:92488-07297'},
{title:'Lower Beach Rd (recorder)', header:'Blees Drain',siteid:69002,mapref:'L37:11296-82652'},
{title:'Trigpole Road (Recorder)', header:'Boundary Drain',siteid:69201,mapref:'K38:99794-78327'},
{title:'State Highway 72 (Recorder)', header:'Bowyers Stream',siteid:68822,mapref:'K36:847-236'},
{title:'Fletchers Farm (Recorder)', header:'Buchanans Creek',siteid:70908,mapref:'J40:63043-01949'},
{title:'Big Gully (Recorder)', header:'Cameron River',siteid:68544,mapref:'J35:579-496'},
{title:'Ashley Meat Factory', header:'Courtenay Stream',siteid:66432,mapref:'M35:813-560'},
{title:'Threlkelds Road (Recorder)', header:'Cust Main Drain',siteid:66417,mapref:'M35:78559-60401'},
{title:'Carleton Road Culvert', header:'Deep Creek (Ashley)',siteid:66205,mapref:'L34:470-738'},
{title:'Downstream The Lake Road (Recorder)', header:'Doyleston Drain',siteid:68320,mapref:'M36:57948-14977'},
{title:'Lower Beach Rd (recorder)', header:'Flemington Drain',siteid:69003,mapref:'L37:111-822'},
{title:'French Farm Valley Road (Recorder)', header:'French Farm Stream',siteid:67408,mapref:'N36:02404-14431'},
{title:'Footbridge (recorder)', header:'Grays River',siteid:71162,mapref:'I38:03698-60122'},
{title:'Taylors Road (Recorder)', header:'Greigs Drain',siteid:66414,mapref:'M35:786-542'},
{title:'Above Mt Florence (Recorder)', header:'Hakataramea River',siteid:71155,mapref:'I39:24791-25399'},
{title:'Leadleys Road', header:'Halswell River',siteid:67804,mapref:'M36:744-333'},
{title:'Ryans Bridge (Recorder)',siteid:67805,mapref:'M36:73084-27178'},
{title:'Willows (Recorder)', header:'Hawkins River',siteid:68005,mapref:'L35:1569-5807'},
{title:'Buxton Terrace (Recorder)', header:'Heathcote River',siteid:66612,mapref:'M36:81562-38474'},
{title:'Syphon (Recorder)', header:'Hinds River Sth Branch',siteid:69101,mapref:'K36:772-115'},
{title:'Gunns Bush (recorder)', header:'Hook River Tributary',siteid:70702,mapref:'J40:498-143'},
{title:'No.2 Hut (Recorder)', header:'Hurunui River',siteid:65108,mapref:'L32:37233-33121'},
{title:'SH1 Bridge (Recorder)',siteid:65101,mapref:'N33:17717-12595'},
{title:'Esk Head (Recorder)', header:'Hurunui River South Branch',siteid:65109,mapref:'M33:550-196'},
{title:'Kaituna Valley Road (Recorder)', header:'Kaituna River',siteid:67702,mapref:'M36:844-166'},
{title:'Mitchells Weir No.9 (Recorder)',siteid:69633,mapref:'J38:51913-79449'},
{title:'Turnbulls Weir No.10 (Recorder)',siteid:69634,mapref:'J38:53594-77892'},
{title:'Mulvihills (Recorder)',siteid:69645,mapref:'J38:53783-73926'},
{title:'Upstream Water Supply (Recorder)', header:'Kirkliston Stream',siteid:71156,mapref:'I40:12928-19808'},
{title:'Grays Road (Recorder)', header:'Kowai River North Branch (Amberley)',siteid:66101,mapref:'M34:8746-8250'},
{title:'Below Orange Grove (Recorder)', header:'Kowhai',siteid:63201,mapref:'O31:55880-74873'},
{title:'D/S Warren Creek Confl (Recorder)', header:'Lyell Creek',siteid:63001,mapref:'O31:65798-68080'},
{title:'Tekoa Road Bridge (Recorder)', header:'Mandamus River',siteid:65102,mapref:'M33:7380-2425'},
{title:'SH8 Bridge (Recorder)', header:'Mary Burn',siteid:71130,mapref:'I38:960-667'},
{title:'SH1 Bridge (Recorder)', header:'Middle Creek',siteid:63101,mapref:'O31:65999-70706'},
{title:'Old Weir (Recorder)', header:'North Ashburton River',siteid:68810,mapref:'K36:87956-35744'},
{title:'Brown Road', header:'Ohapi Creek',siteid:69508,mapref:'K38:811-618'},
{title:'Houstons (Recorder)',siteid:69519,mapref:'K38:80894-61772'},
{title:'Below Syphon (Recorder)', header:'Ohau River',siteid:71194,mapref:'H38:6670-5356'},
{title:'Dalleys Weir (Recorder)', header:'Ohoka Spring',siteid:66435,mapref:'M35:76002-58387'},
{title:'Downstream Dewatering Pipe', header:'Okeover Stream',siteid:166651,mapref:'M35:761-427'},
{title:'Fox Creek (Recorder)', header:'Okuku River',siteid:66213,mapref:'M34:60275-84854'},
{title:'Wardells Bridge (Recorder)', header:'Omarama Stream',siteid:71136,mapref:'H39:677-305'},
{title:'Above Tara Hills (Recorder)',siteid:71189,mapref:'H39:62425-25961'},
{title:'Friesian Stud Farm (Recorder)', header:'Opara Stream (Okains Bay)',siteid:67001,mapref:'N36:12895-21591'},
{title:'SH1 Bridge (Recorder)', header:'Opihi River',siteid:69607,mapref:'K38:71800-59158'},
{title:'Rockwood (Recorder)',siteid:69618,mapref:'J38:45515-69046'},
{title:'U/S Confluence of Ohapi Creek (Recorder)', header:'Orari River',siteid:69514,mapref:'K38:816-620'},
{title:'Gorge (Recorder)',siteid:69505,mapref:'J37:65356-95179'},
{title:'Gorge (Recorder)', header:'Otaio River',siteid:70303,mapref:'J39:45672-30031'},
{title:'The Grampians', header:'Pahau River',siteid:65110,mapref:'M33:840-288'},
{title:'Lower Beach Road (Recorder)', header:'Parakanoi Drain',siteid:69001,mapref:'K38:05727-79402'},
{title:'SH1 (Recorder)', header:'Pareora River',siteid:70103,mapref:'J39:66317-33573'},
{title:'Huts (Recorder)',siteid:70105,mapref:'J39:55257-42176'},
{title:'Quailburn Road', header:'Quail Burn',siteid:71118,mapref:'H39:63223-38753'},
{title:'Klondyke (Recorder)', header:'Rangitata River',siteid:69302,mapref:'J36:66716-14796'},
{title:'Rockburn (Recorder)', header:'Rocky Gully',siteid:69621,mapref:'J38:325-513'},
{title:'Coes Ford (Recorder)', header:'Selwyn River',siteid:68002,mapref:'M36:62636-23301'},
{title:'Harpers Road (Recorder)', header:'Silverstream (Kaiapoi)',siteid:66415,mapref:'M35:748-536'},
{title:'Mt Somers (Recorder)', header:'South Ashburton River',siteid:68806,mapref:'K36:726-261'},
{title:'Buicks Bridge (Recorder)',siteid:68827,mapref:'J36:6144-3448'},
{title:'Schluters Weir (Recorder)', header:'South Brook Spring',siteid:66407,mapref:'M35:76008-65445'},
{title:'Stoneleigh Road (Recorder)', header:'South Opuha River',siteid:69619,mapref:'J37:30069-90416'},
{title:'Lower Beach/Ocean View Rd (Recorder)', header:'Stormy Drain',siteid:69202,mapref:'K38:97606-73389'},
{title:'Barrosa (Recorder)', header:'Stour River',siteid:68828,mapref:'K36:70533-29284'},
{title:'Radcliffe Road (Recorder)', header:'Styx River',siteid:66425,mapref:'M35:81726-49037'},
{title:'Preeces Road', header:'Taranaki Creek',siteid:66215,mapref:'M35:858-678'},
{title:'Gressons Road (Recorder)',siteid:66216,mapref:'M35:80973-66867'},
{title:'State Highway 72 (Recorder)', header:'Taylors Stream',siteid:68819,mapref:'K36:87289-30743'},
{title:'Glentohi (Recorder)', header:'Te Moana River',siteid:69644,mapref:'J37:58330-83491'},
{title:'Spillway (Recorder)', header:'Tekapo River',siteid:71131,mapref:'I37:07880-85796'},
{title:'Manse Bridge (Recorder)', header:'Temuka River',siteid:69602,mapref:'K38:71779-61070'},
{title:'Picnic Grounds (Recorder)', header:'Tengawai River',siteid:69635,mapref:'J38:48454-54542'},
{title:'Lake Poaka (Recorder)', header:'Twizel River',siteid:71117,mapref:'H38:78506-62619'},
{title:'Marble Point (Recorder)', header:'Waiau River',siteid:64602,mapref:'N32:91468-40191'},
{title:'Malings Pass (Recorder)',siteid:64606,mapref:'M31:81059-87470'},
{title:'Mouth (Recorder)',siteid:64609,mapref:'O33:39363-26609'},
{title:'Upstream Bradshaws Bridge', header:'Waihao River',siteid:70913,mapref:'J40:6352-0074'},
{title:'McCulloughs Bridge (Recorder)',siteid:70902,mapref:'J40:49655-98774'},
{title:'DOC Reserve (Recorder)', header:'Waihi River',siteid:69649,mapref:'J37:62202-87795'},
{title:'Old Highway Bridge (Recorder)', header:'Waimakariri River',siteid:66401,mapref:'M35:81829-54718'},
{title:'Otarama (Recorder)',siteid:66403,mapref:'L34:24489-71762'},
{title:'White Gorge (Recorder)', header:'Waipara River',siteid:65901,mapref:'M34:78638-93713'},
{title:'Teviotdale (Recorder)',siteid:65904,mapref:'N34:91784-88581'},
{title:'Kurow (Recorder)', header:'Waitaki River',siteid:71104,mapref:'I40:080-088'},
{title:'Lake Sumner Road Bridge (Recorder)', header:'Waitohi River',siteid:65106,mapref:'M33:7147-1667'},
{title:'Lower Beach Rd (recorder)', header:'Windermere Drain',siteid:69004,mapref:'K38:0422-7831'}
            ];

var search = Titanium.UI.createSearchBar();
// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	search:search
});

// create table view event listener
tableview.addEventListener('click', function(e)
{
	// event data
	var index = e.index;
	var section = e.section;
	var row = e.row;
	var rowdata = e.rowData;
	//Titanium.UI.createAlertDialog({title:'Table View',message:'row ' + row + ' index ' + index + ' section ' + section  + ' row data ' + rowdata}).show();
	Ti.App.fireEvent('change_river', {title:e.row.title, siteid:e.row.siteid,river:e.row.mapref});
	win.close('/views/v_GaugingCard_SiteData.js',{animated:true});
});
// set filters
var index = [
{title:'A',index:1},
{title:'B',index:8},
{title:'C',index:13},
{title:'D',index:16},
{title:'F',index:18},
{title:'G',index:20},
{title:'H',index:22},
{title:'K',index:32},
{title:'L',index:39},
{title:'M',index:40},
{title:'N',index:43},
{title:'O',index:44},
{title:'P',index:58},
{title:'Q',index:62},
{title:'R',index:63},
{title:'S',index:65},
{title:'T',index:74},
{title:'W',index:82}
];
tableview.index = index;
// add table view to the window
Titanium.UI.currentWindow.add(tableview);


// var picker = Ti.UI.createPicker();
// 
// var data = [];
// 
// data[0]=Ti.UI.createPickerRow({title:'White Gorge',custom_item:'b'});
// data[1]=Ti.UI.createPickerRow({title:'Waimak Bridge',custom_item:'s'});
// data[2]=Ti.UI.createPickerRow({title:'Avon River',custom_item:'m'});
// data[3]=Ti.UI.createPickerRow({title:'TimaVegas River',custom_item:'g'});
// 
// 
// // turn on the selection indicator (off by default)
// picker.selectionIndicator = true;
// 
// picker.add(data);
// 
// picker.addEventListener('change', function(e) {
	// Ti.App.fireEvent('change_river', {title:e.row.title});
// });
// 
// win.add(picker);
// 
// var label = Ti.UI.createLabel({
	// text:'select a river location',
	// top:6,
	// width:'auto',
	// height:'auto',
	// textAlign:'center',
	// color:'white'
// });
// win.add(label);
// 
// 
