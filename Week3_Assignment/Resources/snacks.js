
var currentWindow = Ti.UI.currentWindow;
var imageList = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "snacks");
var dirList = imageList.getDirectoryListing();
// JSON Data for Snacks
var dataList = {
	"snacks": {
		"headTitle": "Snacks",
		"footTitle": "Pick a snack for more info.",
		"snack": [
			{"name": "Deviled Eggs with Hummus",
			 "description": "A very filling snack, without s0 much saturated fat. This quick, easy to make snack is a major hit for people who love deviled eggs.",
			 "prep": "15 min",
			 "cook": "None",
			 "total": "15 min",
			 "yield": "1 serving",
			 "ingredients": "2 Egg whites – hard boiled, yolks discarded, 4 tbsps., Hummus, Paprika – to taste.",
			 "nutrition": "Calories 135, Protein 12g, Total Fat 6g, Carbohydrates 9g, Fiber 4g",
			 "reviews": "" },
			 {"name": "Feta-Walnut Dip with Veggies",
			 "description": "A wonderful taste of Greece! This easy vegetable dip is a very tasty and nutritious snack.",
			 "prep": "2 hr 15 min",
			 "cook": "None",
			 "total": "2 hr 15 min",
			 "yield": "11 servings of 2 ¾ cups",
			 "ingredients": "2 cups 0%-Fat Greek yogurt, 1 cup Low-fat Feta – Crumbled, ½ lemon Fresh-squeezed lemon juice, 3 cloves Garlic – pressed, 3 tbsps. Walnuts – chopped, ½ tsp. Black pepper = ground, ½ tsp. Tabasco – to taste, 4 Bell peppers – sliced for dipping, 2 Cucumbers – sliced for dipping, 3 cups Cauliflower – cut for dipping, 3 ½ cups Broccoli – cut for dipping, 1 cup Cherry tomatoes.",
			 "nutrition": "Calories 94, Protein 9g, Total Fat 3g, Carbohydrates 11g, Fiber 3g.",
			 "reviews": "" }		
		]
	}
};

var table = Ti.UI.createTableView({
	style: Ti.UI.iPhone.TableViewStyle.GROUPED	
});
console.log(table);
var mySections = [];
for (n in dataList){
var tableSection = Ti.UI.createTableViewSection({
	headerTitle: dataList[n].headTitle,
	footerTitle: dataList[n].footTitle	
	});
	for (var i=0, j=dataList[n].snack.length; i<j; i++){
		var theRow = Ti.UI.createTableViewRow({
			title: dataList[n].snack[i].name,
			desc: dataList[n].snack[i].description,
			image: "snacks/" + dirList[i],
			hasChild: true
		});	
		tableSection.add(theRow);
	}
	mySections.push(tableSection);
}
table.addEventListener("click", function(event) {
	var detailWindow = Ti.UI.createWindow({
		backgroundImage: "bg1.png",
		backgroundColor: "#000",
		title: event.source.title,
		modal: true,
		_parent: Ti.UI.currentWindow,
		navGroup: currentWindow.navGroup,
		rootWindow: currentWindow.rootWindow
	});
	var scrollView = Ti.UI.createScrollView({
  		contentWidth: 'auto',
  		contentHeight: 'auto',
  		layout: 'vertical',
  		top: 10,
  		bottom: 50,
  		//showVerticalScrollIndicator: true,
  		//showHorizontalScrollIndicator: true,
  		//height: '80%',
  		width: '90%'
	});
	var centerView = Ti.UI.createView({
		backgroundColor: "#000",
		//bottom: 50,
		borderColor: "#fff",
		borderRadius: 20,
		height: 800,
		//top: 10,
		left: 5,
		right: 5
	});
	var detailText = Ti.UI.createLabel({
		text: event.source.desc,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		top: 5,
		left: 10,
		right: 10,
		color: "#fff",
		font: {fontSize: 13, fontFamily: "Arial"}
	});
	var image = Ti.UI.createImageView({
	image: event.source.image,
	bottom: 0,
	height: 200
});

	detailWindow.add(scrollView);
	scrollView.add(centerView);
	centerView.add(detailText, image);
	currentWindow.navGroup.open(detailWindow, {animation: true});
	
});
table.setData(mySections);
currentWindow.add(table);