
var myobj;
var myform = Ti.App.model.get_currentform();
var win = Titanium.UI.currentWindow;

Ti.App.utils.readLookupFiles('sites.json',null,fn_buildsitesTbl);

function fn_buildsitesTbl(mysites) {
	
	Ti.API.info('build list data');
	///to hold list data
	var data = [];
	//header for rows
	var header;
	// index for filters
	var tblindex=[],mycharindex;
	Ti.API.info('mysites.data.item.length ' + mysites.data.item.length);
	if (mysites.data.length !==0) {
		for (var i=0; i< mysites.data.item.length - 1; i++) {

			//displaying header rows logic
			var displayheader=false;
			if (header !== mysites.data.item[i].River) {
				header = mysites.data.item[i].River;
				displayheader=true;
			}
			if(displayheader) {
				var rowdetail = {
					className:"mysites",
					title: mysites.data.item[i].SiteName,
					siteid: mysites.data.item[i].SiteNumber,
					region: mysites.data.item[i].Region,
					nzmgx:  mysites.data.item[i].NZMGX,
					nzmgy:  mysites.data.item[i].NZMGY,
					lat:  mysites.data.item[i].WGS84_LATITUDE,
					lng:  mysites.data.item[i].WGS84_LONGITUDE,
					river: mysites.data.item[i].River,
					header: mysites.data.item[i].River
				}
			} else {
				var rowdetail = {
					className:"mysites",
					title: mysites.data.item[i].SiteName,
					siteid: mysites.data.item[i].SiteNumber,
					region: mysites.data.item[i].Region,
					nzmgx:  mysites.data.item[i].NZMGX,
					nzmgy:  mysites.data.item[i].NZMGY,
					lat:  mysites.data.item[i].WGS84_LATITUDE,
					lng:  mysites.data.item[i].WGS84_LONGITUDE,
					river: mysites.data.item[i].River
				}
			};
			var thisRow = Ti.UI.createTableViewRow(rowdetail);
			//thisRow.add(lb1);
			data.push(thisRow);

			//capturing index logic for set filters
			if (mycharindex !== mysites.data.item[i].River.charAt(0)) {
				mycharindex = mysites.data.item[i].River.charAt(0);
				var indexobj = {
					title: mysites.data.item[i].River.charAt(0),
					index:i
				};
				tblindex.push(indexobj);
			}

		}///do for loop
	};

	//re sort array /// NOT USING THE FASTER REVERSE ARRAY.
	//data.reverse();
	//tblindex.reverse();

	var search = Titanium.UI.createSearchBar();
	// create table view
	var tableview = Titanium.UI.createTableView({
		data:data,
		search:search
	});

	// create table view event listener
	tableview.addEventListener('click', function(e) {
		var d;
		// event data
		var index = e.index;
		var section = e.section;
		var row = e.row;
		var rowdata = e.rowData;
		
		//debug properties
		// for (var name in myform) {
			// Ti.API.info('Ti.App.model.currentform properties '+name);
		// }
		
		///load value into form
		myform.siteid = row.siteid;
		myform.sitename = row.title;
		myform.river = row.river;
		myform.details.name = row.title;
		myform.lat = row.lat;
		myform.lng = row.lng;
				
		//if date not already there
		if(myform.datetaken === '') {
			d=new Date();
			d.toLocaleDateString();
			myform.datetaken = d;
		}
		
		Ti.App.model.set_currentform(myform);

		Ti.App.fireEvent('change_river', {
			title: row.title,
			siteid: row.siteid,
			river: row.river,
			datetaken: myform.datetaken,
			x: row.nzmgx,
			y: row.nzmgy,
			lat: row.lat,
			lng: row.lng
		});
		win.close('/views/v_GaugingCard_SiteData.js', {
			animated:true
		});

	});///eoevt
	//add table index
	tableview.index = tblindex;

	// add table view to the window
	Titanium.UI.currentWindow.add(tableview);

}; //eof
