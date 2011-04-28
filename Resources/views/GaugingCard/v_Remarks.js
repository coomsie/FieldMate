//create  remarks UI

var win = Titanium.UI.currentWindow;

var remark = Titanium.UI.createTextField({
    color:'#336699',
    height:200,
    width:300,
    top:10,
    hintText:'enter note here',
    suppressReturn:false,
    verticalAlign:'top',
    textAlign:'left',
    editable:true,
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

win.add(remark);
