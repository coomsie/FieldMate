Titanium.include('joli.js');

function db() {

	//*** 'me' acts as an alias that can be used within the methods
	var me = this;

	// //*** Public properties:

	// //*** Protected variables:
	// var somevar = "";

	// //*** Protected method used only internally. Call with 'me.my_own()'
	// this.my_own = function (arg1) {
	// };
	joli.connection = new joli.Connection('fieldmate');

	
var models = (function() {
mo = Object();
mo.formdata = new joli.model({
table: 'formdata',
columns: {
id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
type: 'TEXT',
version:'TEXT',
deviceid: 'TEXT',
appversion: 'TEXT',
user:'TEXT',
data:'TEXT',
inserteddate: 'TEXT',
lastupdated: 'TEXT',
submitteddate: 'TEXT',
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

// 
//
//		insert new row into stage reading table
//		stagereadings => data model
//		rows => rows from json  
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

//** PUBLIC METHODS ** //
 
//		insert new row into form data  table
//		data => data from json of form model with actuals  
//		formtype => form name
//		 
db.prototype.insertNewForm  = function insert_FormData(data,formtype,formversion) {
			//grab date
			var d=new Date();
			d.toLocaleDateString();
			
			//grab current user
			var user = Ti.App.model.appConfig.CurrentUser;
			
            //insert only one row
            var newFORM = models.formdata.newRecord({
            	type: formtype,
				version:formversion,
				deviceid: Ti.Platform.id ,
				appversion: Ti.App.version,
				user: user,
				data: data,
				inserteddate: d.toString(),
				submitteddate: null,
				syncdate:null
            });
            // persist it
            newFORM.save();
            
            //increase badges
            tab2.badge =tab2.badge+1;
};                          

 
//		update  row into form data  table
//		data => data from json of form model with actuals  
//		formtype => form name
//		 
db.prototype.updateForm  = function update_FormData(data, dbid) {
			Ti.API.info('updating ' + dbid);
			//grab date
			var d=new Date();
			d.toLocaleDateString();
           	//update
           	var mydb = Titanium.Database.open('fieldmate');
           	var updateDate = d.toString();
           	mydb.execute('UPDATE formdata SET data = ? , lastupdated = ? WHERE id = ? ',data , updateDate, dbid );
           	Titanium.API.info('JUST updated, rowsAffected = ' + mydb.rowsAffected);
			mydb.close(); // close db when you're done to save resources
};

//		submit form ready for sync process =>  row into form data  table
//		data => data from json of form model with actuals  
//		formtype => form name
//		 
db.prototype.submitForm  = function submit_FormData(data,dbid) {
			Ti.API.info('updating ' + dbid);
			//grab date
			var d=new Date();
			d.toLocaleDateString();
           	//update
           	var mydb = Titanium.Database.open('fieldmate');
           	var updateDate = d.toString();
           	mydb.execute('UPDATE formdata SET submitteddate = ?, lastupdated = ? WHERE submitteddate IS NULL AND id = ?',updateDate , updateDate, dbid);
           	Titanium.API.info('JUST updated, rowsAffected = ' + mydb.rowsAffected);
			mydb.close(); // close db when you're done to save resources
			
            //increase /decreases badges
            tab3.badge =tab3.badge+1;
            tab2.badge =tab2.badge-1;
};


//		upload  row into form data  table
//		data => data from json of form model with actuals  
//		formtype => form name
//		 
db.prototype.uploadForm  = function upload_FormData(data,dbid) {
			Ti.API.info('about to update row id =>' + myrowid);
			//grab date
			var d=new Date();
			d.toLocaleDateString();
           	//update
           	var mydb = Titanium.Database.open('fieldmate');
           	var updateDate = d.toString();
           	mydb.execute('UPDATE formdata SET syncdate = ? WHERE syncdate IS NULL and id  =  ? ', updateDate ,dbid );
           	Titanium.API.info('JUST updated, rowsAffected = ' + mydb.rowsAffected);
			mydb.close(); // close db when you're done to save resources
			
            //increase /decreases badges
            tab3.badge =0;
};              
                          

//	read formsfrom db
// state => 'draft' or 'submitted'               
db.prototype.readForms = function readForms(state)
{
	Ti.API.info('state ' + state);
  	var forms,q;
  	if (state === 'draft')
  	{
  		q = new joli.query()
  			.select('*')
  			.from('formdata')
  			.where('submitteddate IS NULL');
  	}
  	if (state === 'submitted')
  	{
		q = new joli.query()
  			.select('*')
  			.from('formdata')
  			.where('submitteddate IS NOT NULL AND syncdate IS NULL');
  	}
  	Ti.API.info('reading form data');
  	forms = q.execute();
  	Ti.API.info(forms);
  	var data = [];
  	while (forms.isValidRow()) {
  				var formdata = forms.fieldByName('data');
  				var mydata  = JSON.parse(formdata);
  				var mytitle = mydata.sitename + ' ' + forms.fieldByName('inserteddate');
				data.push({
					dbrowid: forms.fieldByName('id'),
					formmodel : formdata,
				  	title: mytitle,
				  	hasChild: true,
				  	url:'/views/v_GaugingCard_Master.js'
				});	
				forms.next();
			}
	forms.close();
	return data;
}


//read stage records
db.prototype.readStageReadings = function readStageReadings(siteid,fn_callback)
{
	//grab readings for site
	var readings = models.stagedreadings.all({
		where: {
		  'sitenumber = ?': siteid
		},
		order: 'datetaken desc, type desc'
	});
	var data = [];
  	while (readings.isValidRow()) {
				data.push({
					type: readings.fieldByName('type'),
					datetaken: readings.fieldByName('datetaken'),
					timetaken: readings.fieldByName('timetaken'),
					recorderstage:readings.fieldByName('recorderstage'),
					wellstage:readings.fieldByName('wellstage')
				});	
				readings.next();
			}
	readings.close();
	
	//run callback function.
	fn_callback(data);
}




                
///testing ground


db.prototype.mytestfn = function mytestfn(myJSON)
{
Ti.API.debug(JSON.stringify(myJSON).substring(0,100));
///for (var key in myJSON.data.item)
insert_StagedReadings(models.stagedreadings,myJSON.data.item);
};

};