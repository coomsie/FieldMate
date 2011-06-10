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
            
            //drop index
            var dropixsql = "DROP index if exists 'main'.'ix_stagedreadings_sitenumber'";
            var mydb = Titanium.Database.open('fieldmate');
           	mydb.execute(dropixsql);
           	Titanium.API.info('JUST created staged readings index');
			mydb.close(); // close db when you're done to save resources
            
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
			
			//add index
			var createixsql = "CREATE  INDEX if not exists  'main'.'ix_stagedreadings_sitenumber' ON 'stagedreadings' ('sitenumber' ASC)";
			var mydb = Titanium.Database.open('fieldmate');
           	mydb.execute(createixsql);
           	Titanium.API.info('JUST created staged readings index');
			mydb.close(); // close db when you're done to save resources

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
            
            Ti.API.debug('id of form'  + joli.connection.lastInsertRowId() );
            return joli.connection.lastInsertRowId();
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
db.prototype.uploadForm  = function upload_FormData(dbid) {
			Ti.API.info('about to update row id =>' + dbid);
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
                          
//		delete  form from data  table
//		form row id   
//		 
db.prototype.deleteDraftForm  = function delete_DraftFormData(dbid) {
			Ti.API.info('about to delete row id =>' + dbid);
           	//delete
           	var mydb = Titanium.Database.open('fieldmate');
           	mydb.execute('DELETE from formdata WHERE id  =  ? ', dbid );
           	Titanium.API.info('JUST deleted, rowsAffected = ' + mydb.rowsAffected);
			mydb.close(); // close db when you're done to save resources
			
            //increase /decreases badges
            tab2.badge -=1;
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
  			///.where('submitteddate IS NOT NULL AND syncdate IS NULL');
  			.where('submitteddate IS NOT NULL AND syncdate IS NOT NULL'); ////THIS IS FOR TESTING ONLY !!!!%^!&^%^&%&^%
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

                
//		LOAD LOOKUP data into tables
//		expects LOOKUP Object form model
//		LookupURLS: [{
//		FileName:'stagedreadings.json',
//		URL:'http://tools.ecan.govt.nz/DataCatalogue/data/Water/Stage%20Readings/JSON',
// 		inDB: true
//		//}]
db.prototype.loadData = function loadData(LookupURL, myJSON)
{
insert_StagedReadings(models.stagedreadings,myJSON.data.item);
};

};