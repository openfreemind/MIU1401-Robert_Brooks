
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
			 "description": "A very filling snack, without so much saturated fat. This quick, easy to make snack is a major hit for people who love deviled eggs.",
			 "prep": "15 min",
			 "cook": "None",
			 "total": "15 min",
			 "yield": "1 serving",
			 "ingredients": "2 Egg whites – hard boiled, yolks discarded, 4 tbsps., Hummus, Paprika – to taste.",
			 "instructions": "Slice the eggs in half, discard yolks, and fill each egg white half with one-fourth of the hummus. Top with paprika to taste.",
			 "nutrition": "Calories 135, Protein 12g, Total Fat 6g, Carbohydrates 9g, Fiber 4g",
			 "reviews": "" },
			 {"name": "Feta-Walnut Dip with Veggies",
			 "description": "A wonderful taste of Greece! This easy vegetable dip is a very tasty and nutritious snack.",
			 "prep": "2 hr 15 min",
			 "cook": "None",
			 "total": "2 hr 15 min",
			 "yield": "11 servings of 2 ¾ cups",
			 "ingredients": "2 cups 0%-Fat Greek yogurt, 1 cup Low-fat Feta – Crumbled, ½ lemon Fresh-squeezed lemon juice, 3 cloves Garlic – pressed, 3 tbsps. Walnuts – chopped, ½ tsp. Black pepper = ground, ½ tsp. Tabasco – to taste, 4 Bell peppers – sliced for dipping, 2 Cucumbers – sliced for dipping, 3 cups Cauliflower – cut for dipping, 3 ½ cups Broccoli – cut for dipping, 1 cup Cherry tomatoes.",
			 "instructions": "Add Feta cheese to Greek yogurt, lemon juice, minced garlic, toasted walnuts, freshly ground black pepper, and hot sauce. Mix well. Cover with plastic wrap and refrigerate for at least 2 hours to allow the flavors to blend. Cut the veggies for dipping.",
			 "nutrition": "Calories 94, Protein 9g, Total Fat 3g, Carbohydrates 11g, Fiber 3g.",
			 "reviews": "" }		
		]
	}
};

var tabBar = Titanium.UI.iOS.createTabbedBar({
    labels:['Home', 'Meals', 'Snacks', 'Favorites'],
    backgroundColor:'#0099ff',
    bottom: 0,
    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
    height:50,
    width:'100%',
    url: 'app.js'
});

var search = Titanium.UI.createSearchBar({
    barColor:'#000', 
    showCancel:true,
    height:43,
    top:0,
});

var table = Ti.UI.createTableView({
	style: Ti.UI.iPhone.TableViewStyle.GROUPED,
	search: search,
	searchAsChild: true	
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
			prep: dataList[n].snack[i].prep,
			cook: dataList[n].snack[i].cook,
			total: dataList[n].snack[i].total,
			yield: dataList[n].snack[i].yield,
			ing: dataList[n].snack[i].ingredients,
			inst: dataList[n].snack[i].instructions,
			nut: dataList[n].snack[i].nutrition,
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
		top: 210,
		left: 10,
		right: 10,
		color: "#fff",
		font: {fontSize: 13, fontFamily: "Arial"}
	});
	var prepText = Ti.UI.createLabel({
		text: "Prep: " + event.source.prep + ", Cook: " + event.source.cook + ", Total: " + event.source.total +", Yield: " + event.source.yield,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		top: detailText.top + 75,
		left: 10,
		right: 10,
		color: "#fff",
		font: {fontSize: 13, fontFamily: "Arial"}
	});	
	var ingText = Ti.UI.createLabel({
		text: "Ingredients: " + event.source.ing,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		top: prepText.top + 50,
		left: 10,
		right: 10,
		color: "#fff",
		font: {fontSize: 13, fontFamily: "Arial"}
	});
	var instText = Ti.UI.createLabel({
		text: "Instructions: " + event.source.inst,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		top: ingText.top + 175,
		left: 10,
		right: 10,
		color: "#fff",
		font: {fontSize: 13, fontFamily: "Arial"}	
	});
	var nutText = Ti.UI.createLabel({
		text: "Nutrition Facts (per serving): " + event.source.nut,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		top: instText.top + 125,
		left: 10,
		right: 10,
		color: "#fff",
		font: {fontSize: 13, fontFamily: "Arial"}	
	});
	var image = Ti.UI.createImageView({
	image: event.source.image,
	top: 5,
	height: 200
});

	detailWindow.add(scrollView, tabBar);
	scrollView.add(centerView);
	centerView.add(detailText, prepText, ingText, instText, nutText, image);
	currentWindow.navGroup.open(detailWindow, {animation: true});
	
});
table.setData(mySections);
currentWindow.add(table);