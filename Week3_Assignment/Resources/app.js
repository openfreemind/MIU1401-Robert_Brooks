var win = Ti.UI.createWindow({
	title: "FT Mobile Recipes",
	tabBarHidden: true,
	backgroundColor: "#333",
});
var navWindow = Ti.UI.createWindow({
	title: "FT Mobile Recipes",
	modal: true,
	backgroundImage: "bg1.png",
	backgroundColor: "#000"
});
var container = Ti.UI.createView({
	top: 0,
	height: 300,
	width: "100%"
});
var gLabel = Ti.UI.createLabel({
	text: "Meals",
	font: {fontSize: 25, fontFamily: 'Helvetica'},
	color: "#fff",
	left: 20,
	file: "meals1.js"
});
var gView = Ti.UI.createView({
	height: 100,
	top: 0,
	backgroundColor: "#0099ff",
	file: gLabel.file,  // loading in separate js
	text: gLabel.text
});
var tLabel = Ti.UI.createLabel({
	text: "Snacks",
	font: {fontSize: 25, fontFamily: 'Helvetica'},
	color: gLabel.color,
	left: 20,
	file: "snacks.js"
});
var tView = Ti.UI.createView({
	height: 100,
	top: 100,
	backgroundColor: gView.backgroundColor,
	text: tLabel.text,
	file: tLabel.file  // loading in separate js
});
var fLabel = Ti.UI.createLabel({
	text: "Favorites",
	font: {fontSize: 25, fontFamily: 'Helvetica'},
	color: gLabel.color,
	left: 20,
	file: "favorites.js"
});
var fView = Ti.UI.createView({
	backgroundColor: gView.backgroundColor,
	height: 100,
	top: 200,
	text: fLabel.text,
	file: fLabel.file  // loading in separate js
});
var nameLabel = Ti.UI.createLabel({
	text: "FT Mobile Recipes",
	color: gLabel.color,
	top: 350,
	font: {fontSize: 15, fontFamily: 'Helvetica'},
});
var spacer = Ti.UI.createView({
	backgroundColor: "fff",
	bottom: 100,
	height: 2
});
var spacer2 = Ti.UI.createView({
	backgroundColor: "fff",
	bottom: 200,
	height: 2
});
container.addEventListener("click", function(event){
	var newWindow = Ti.UI.createWindow({
		title: event.source.text,
		modal: true,
		backgroundColor: "#000",
		backgroundImage: "bg1.png",
		url: event.source.file,
		// next three lines pass the navGroup properties to each newWindow created
		_parent: Ti.UI.currentWindow,
		navGroup: navGroup,
		rootWindow: navWindow
	});
	navGroup.open(newWindow, {animation: true});
});	
var navGroup = Ti.UI.iPhone.createNavigationGroup({
	window: navWindow	
});
navWindow.navGroup = navGroup;
gView.add(spacer, gLabel);
tView.add(spacer, tLabel);
fView.add(fLabel);
container.add(gView, tView, fView, spacer, spacer2);
navWindow.add(container, nameLabel);
win.add(navGroup);
win.open();
