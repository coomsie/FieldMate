var myobj;
Ti.App.utils.readLookupFiles('sites.json',null,fn_buildsitesTbl);

var win = Titanium.UI.currentWindow;

function fn_buildsitesTbl(mysites) {
	
	//add to model
	// Ti.App.model.mysites = this.mysites;
	// Ti.API.info(Ti.App.model.mysites);
	// for (var name in Ti.App.model.mysites) {
		// Ti.API.info('Ti.App.model.mysites properties '+name);
	// }

	Ti.API.info('build list data');
	///to hold list data
	var data = [];
	//header for rows
	var header;
	// index for filters
	var tblindex=[],mycharindex;
	Ti.API.info('mysites.data.item.length ' + mysites.data.item.length);
	if (mysites.data.length !==0) {
		for (var i = mysites.data.item.length - 1; i >= 0; i--) {

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
					lat:  '',
					lng:  '',
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
					lat:  '',
					lng:  '',
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

	//re sort array
	data.reverse();
	tblindex.reverse();

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

		//add data to loaded form model
		// Ti.App.model.currentform.siteid = e.row.siteid;
		// Ti.App.model.currentform.sitename =e.row.title;
		// Ti.App.model.currentform.river =e.row.river;
		
		
		//if date not already there
		for (var name in Ti.App.model.currentform) {
			Ti.API.info('Ti.App.model.currentform properties '+name);
		}
		if(Ti.App.model.currentform.datetaken === undefined) {
			d=new Date();
			d.toLocaleDateString();
			Ti.App.model.currentform.datetaken = d;
		}

		Ti.App.fireEvent('change_river', {
			title:e.row.title,
			siteid:e.row.siteid,
			river:e.row.river,
			datetaken:d
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