console.log("Working");
var currentWindow = Ti.UI.currentWindow;
var imageList = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "recipes");
var dirList = imageList.getDirectoryListing();
// JSON DATA for Meals
var dataList = {
	"Meals": {
		"headTitle": "Meals",
		"footTitle": "Pick a meal for more info.",
		"meal": [
			{"name": "Chicken Zoneitorri",
			 "description": "Chicken Zoneitorri is a very healthy, and macronutrient balanced meal. Perfect for those who like chicken stir-fry.",
			 "prep": "10 min",
			 "cook": "20 min",
			 "total": "30 min",
			 "yield": "1 serving",
			 "ingredients": "3 oz. Boneless skinless chicken breast – cut into strips, 1 tsp. Olive oil, 2 tbsps. Unsalted chicken stock, ½ Green bell pepper – large, chopped, ½ Red bell pepper – medium, chopped, 1 Onion – medium, coarsely chopped, 2 Cups mushrooms – sliced, 2 Cloves garlic – chopped, 1 Cup diced tomatoes – drained, 3 tbsps. Dry white wine, 1 tsp. Italian seasoning, 1 cup Mashed cauliflower – warmed in microwave oven, 1/12 tsp. Extra virgin olive oil – drizzle.",
			 "nutrition": "Calories 385, Protein 31g, Total Fat 12g, Carbohydrates 37g, Fiber 10g.",
			 "reviews": "" },
			 {"name": "Breakfast Hash ",
			 "description": "Breakfast Hash with Tomatoes is a great combination of favorite foods to make a wonderful breakfast. ",
			 "prep": "10 min",
			 "cook": "20 min",
			 "total": "30 min",
			 "yield": "1 serving",
			 "ingredients": "½ tsp. Olive oil, 3 tbsps. Onion – minced, 2 tbsps. Green pepper – minced, 3 tbsps. Mushrooms – minced, 3 oz. cooked beef sirloin steak – or any leftover meat, minced, ¼ cup Cooked steel cut oats, 1 tsp. Worcestershire sauce – To taste, 2 Tomatoes – sliced, 1 Orange.",
			 "nutrition": "Calories 351, Protein 28g, Total Fat 12g, Carbohydrates 37g, Fiber 8g.",
			 "reviews": "" },
			 {"name": "Arlecchino Salad",
			 "description": "A classic tuna salad with strawberries to lend some sweetness.  A great quick salad!",
			 "prep": "15 min",
			 "cook": "None",
			 "total": "15 min",
			 "yield": "1 serving",
			 "ingredients": "1 ½ tsps. Extra Virgin Olive Oil, 3 tbsps. Fresh squeezed lemon juice, 1 tsp. Mrs. Dash Lemon Pepper, 2 cups Romaine lettuce – ripped, 1 cup Strawberries – sliced, 1 ½ cups Cucumber – sliced (150g), 1 cup Cherry tomatoes – halved, ½ cup Mushrooms – sliced, 1 tsp. Cashew nuts – smashed, 3 oz. Chunk light tuna in water, 2 pieces Melba toasts – crushed as croutons.",
			 "nutrition": "Calories 326, Protein 28g, Total Fat 10g, Carbohydrates 35g, Fiber 8g.",
			 "reviews": "" },
			 {"name": "Baked Avocado Chicken and Vegetables",
			 "description": "Avocado is a tasty touch to this traditional chicken dinner.",
			 "prep": "20 min",
			 "cook": "25 min",
			 "total": "45 min",
			 "yield": "1 serving",
			 "ingredients": "1 tbsp. Avocado, 1 tbsp. Low-fat cream cheese, 3 oz. Boneless skinless chicken breast – slice to make a pocket, Salt and pepper – to taste, Cooking spray – olive oil, 1 cup zucchini – sliced, 1 cup Sliced mushrooms, ½ cup Onions – chopped, ¾ cup Unsalted vegetable stock, 1 (14.5 oz.) can Diced tomatoes – with juice, 2 tsp. Dried basil, 1 tsp. Extra virgin olive oil – drizzle.",
			 "nutrition": "Calories 351, Protein 29g, Total Fat 12g, Carbohydrates 40g, Fiber 11g.",
			 "reviews": "" },
			 {"name": "Barbeque Beef with Onions",
			 "description": "A healthy barbeque dish that is actually healthy for you. This macronutrient-balanced meal is just as tasty as regular barbeque.",
			 "prep": "15 min",
			 "cook": "30 min",
			 "total": "45 min",
			 "yield": "1 serving",
			 "ingredients": "A healthy barbeque dish that is actually healthy for you. This macronutrient-balanced meal is just as tasty as regular barbeque.",
			 "nutrition": "Calories 368, Protein 32g, Total Fat 12g, Carbohydrates 36g, Fiber 8g.",
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
	for (var i=0, j=dataList[n].meal.length; i<j; i++){
		var theRow = Ti.UI.createTableViewRow({
			title: dataList[n].meal[i].name,
			desc: dataList[n].meal[i].description,
			image: "recipes/" + dirList[i],
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