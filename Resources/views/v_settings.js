	function view_init_settings(win) {
		win.backgroundColor='#fff';
		win.backgroundGradient={type:'linear', colors:['#000001','#6666'], startPoint:{x:0,y:0}, endPoint:{x:320,y:480}, backFillStart:false};
		win.title='Settings';
		win.barColor='#1A75A2';
		win.translucent=true;
	
	//create UI objects

// create table view data object
var data = [];

var row = Ti.UI.createTableViewRow({height:50});

var lb_svr = Ti.UI.createLabel({
	text:'Server:',
	color:'#999',
	textAlign:'left'
});
var tb_svr = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    value:'http://tools.ecan.govt.nz/fieldmate'
});
row.add(lb_svr);
row.add(tb_svr);

data[0] = row;
row = Ti.UI.createTableViewRow({height:50});

var lb_user = Ti.UI.createLabel({
	text:'User:',
	color:'#999',
	textAlign:'left'

});
var tb_user = Titanium.UI.createTextField({
    color:'#999',
    height:35,
    left:100,
    width:220,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    value:'Phil Downes'
});
row.add(lb_user);
row.add(tb_user);
data[2] = row;

var tableView = Ti.UI.createTableView({
	data:data,
	top:44
});

win.add(tableView);
	
	
	}
	
	// win.backgroundColor='#fff';	
// var data = [];
// var labels = ['new','drafts','history','sync','settings','login'];
	// for (var c=0;c<labels.length;c++)
	// {
		// var item = Titanium.UI.createDashboardItem({
			// image:'images/dashboard/'+labels[c]+'.png',
			// selectedImage:'images/dashboard/'+labels[c]+'.png',
			// label:labels[c],
			// canDelete:false
		// });
		// if (c==0) item.badge = 10;
		// data.push(item);
	// }
// 
// var dashboard = Titanium.UI.createDashboardView({
	// data:data
// });
// win.add(dashboard);
// 
// var label = Titanium.UI.createLabel({
	// text:"Click and hold to re-order or delete",
	// width:"auto",
	// bottom:20,
	// color:"yellow",
	// height:"auto"
// });
// win.add(label);
// 
// 
// var cancel = Titanium.UI.createButton({
	// systemButton:Titanium.UI.iPhone.SystemButton.DONE
// });
// cancel.addEventListener('click', function()
// {
	// dashboard.stopEditing();
// });
// 
// dashboard.addEventListener('edit',function()
// {
	// win.rightNavButton = cancel;
// });
// 
// dashboard.addEventListener('commit',function()
// {
	// win.rightNavButton = null;
	// Ti.API.info('data ' + dashboard.data);
	// for (var i=0;i<dashboard.data.length;i++)
	// {
		// Ti.API.info('label ' + dashboard.data[i].label);
	// }
// });
// 
// dashboard.addEventListener('move', function(e) {
	// Ti.API.log('Moved item '+e.item.label);
// });
// 
// dashboard.addEventListener('dragStart', function(e) {
	// Ti.API.log('Dragging item '+e.item.label);
	// win.rightNavButton = null;
// });
// 
// dashboard.addEventListener('dragEnd', function(e) {
	// Ti.API.log('Drag ended: ' + e.item.label);
	// win.rightNavButton = cancel;
// });
// 
// dashboard.addEventListener('click',function(e)
// {
	// if (e.item.label == 'account')
	// {
		// e.item.badge = 10;
	// }
	// else if (e.item.label == 'cases')
	// {
		// for (var c=0;c<data.length;c++)
		// {
			// if (data[c].label=='account')
			// {
				// data[c].badge = 0;
				// break;
			// }
		// }
	// }
	// else
	// {
		// try
		// {
			// var rect = e.location;
			// var transform = Ti.UI.create2DMatrix().scale(0);
			// var view = Ti.UI.createView({
				// backgroundColor:'black',
				// transform:transform,
				// opacity:0,
				// top:rect.y,
				// left:rect.x,
				// height:rect.height,
				// width:rect.width
			// });
			// var close = Ti.UI.createButton({
				// title:'Close',
				// width:100,
				// height:30
			// });
			// view.add(close);
			// win.add(view);
			// var animation = Ti.UI.createAnimation();
			// animation.left = 0;
			// animation.right = 0;
			// animation.top = 0;
			// animation.bottom = 0;
			// animation.width = 320;
			// animation.height = 460;
			// animation.opacity = 1;
			// animation.duration = 500;
			// animation.transform = Ti.UI.create2DMatrix();
			// view.animate(animation);
			// close.addEventListener('click',function()
			// {
				// view.animate({
					// top:rect.y,
					// left:rect.x,
					// height:rect.height,
					// width:rect.width,
					// opacity:0,
					// duration:400
				// },function()
				// {
					// win.remove(view);
				// });
			// });
		// }
		// catch(E)
		// {
			// Ti.API.error("ERROR = "+E);
		// }
	// }
// });
// 
// 
// }