
if (Ti.Platform.name === 'iPhone OS') {
	Titanium.include('controllers/ctr_utils.js');
} else {
	Titanium.include('/controllers/ctr_utils.js');
}

Titanium.include('joli.js');
joli.connection = new joli.Connection('fieldmate');

var models = (function() {
mo = Object();
mo.formdata = new joli.model({
table: 'formdata',
columns: {
id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
formtype: 'TEXT',
formversion:'INTEGER',
deviceid: 'TEXT',
appversion: 'TEXT',
user:'TEXT',
data:'TEXT',
inserteddate: 'TEXT',
syncdate:'TEXT'
}
});

mo.stagedreadings = new joli.model({
table: 'stagedreadings',
columns: {
id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
sitenumber: 'INTEGER',
type: 'TEXT',
datetaken: 'TEXT',
timetaken: 'INTEGER',
recorderstage:'FLOAT',
wellstage:'FLOAT'
}
});

return mo;
})();


joli.models.initialize();

function insert_StagedReadings(stagedreadings,rows) {
            //first delete all the records
            stagedreadings.deleteRecords();
            
            for (var i = rows.length - 1; i >= 0; i--){
   				// if (myJSON.data.item[i].SiteNumber === "62103")
    			// Ti.API.debug(myJSON.data.item[i].Date + ','+ myJSON.data.item[i].Time + ','+ myJSON.data.item[i].Recorder_Stage);
   				// //insert every row
                        var newSR = models.stagedreadings.newRecord({
                            sitenumber: rows[i].SiteNumber,
							type: rows[i].Type,
							datetaken: rows[i].DateTaken,
							timetaken: rows[i].Time,
							recorderstage:rows[i].Recorder_Stage,
							wellstage:rows[i].Well_Stage
                        });
                        // persist it
                        newSR.save();
			};
};                        
                
                
///testing ground

var myJSONObject = new Object;

readLookupFiles('stagedreadings.json',myJSONObject,mytestfn);

function mytestfn(myJSON)
{
Ti.API.debug(JSON.stringify(myJSON).substring(0,100));
///for (var key in myJSON.data.item)
insert_StagedReadings(models.stagedreadings,myJSON.data.item);
};

