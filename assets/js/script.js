$("#foodForm").on("submit",function(event){
    event.preventDefault();
    var foodName = $("#inputSearch").val()
    $("#inputSearch").val("")
    $("#mainContent").empty()
    if(!foodName){
        return
    }
    var queryUrl = "https://api.edamam.com/search?q="+foodName+"&app_id=835f0cdb&app_key=ff6b03d8611201ee1634b8b112310c42&from=0&to=3&calories=500&health=alcohol-free"

$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function(response){
// a for loop is placed so it will generate all of the recepies in the 
    var main= $("#mainContent")
        main.attr("style","border: groove; margin-bottom: 40px; padding:20px;")
    var foodCard = $("<div class='card'>")
    // mb-3 p-3
   
    var foodRow1 =$("<div class='co'>")
    var foodCol1 = $("<div class='col-6'>")
    var foodCol2 = $("<div class='col-6'>")
    var foodTitle =$("<h5>")  
        foodTitle.text(response.hits[0].recipe.label)
    var img = $("<img class='img-fluid'>")
        img.attr("src",response.hits[0].recipe.image)
    var calEl = $("<div class= 'col-12 mt-3'>")
        calEl.attr("style","border: groove;")
        calEl.text("Calories: " + response.hits[0].recipe.calories.toFixed(0)+ " KCAL")
    var fatEl = $("<p>")
        fatEl.text("Fat: " + response.hits[0].recipe.totalNutrients.FAT.quantity.toFixed(0)+" G")
    var protienEl =$("<p>")
        protienEl.text("Protien: " + response.hits[0].recipe.totalNutrients.PROCNT.quantity.toFixed(0)+" G")
    var healthLabel = $("<ul>")
        healthLabel.attr("style","border: 5px solid black;")
        healthLabel.text("Health Label: ")
    var foodList =$("<ul>")
        foodList.attr("style","border: dotted; ")
        foodList.text("Ingredients: ") 
    var iframeEl = $("<iframe>") 
        iframeEl.attr("width","755","height","400")
        iframeEl.attr("src",response.hits[0].recipe.url)

    main.prepend(foodCard)
    foodCard.append(foodRow1)
    foodRow1.append(foodCol1)
    foodRow1.append(foodCol2)
    foodCol1.append(img)
    foodCol1.append(calEl)
    calEl.append(fatEl)
    fatEl.append(protienEl)
    foodCol2.append(foodTitle)
    foodCol2.append(healthLabel)
    foodCol2.append(foodList)
    foodCard.append(iframeEl)  
 



    for(var h = 0; h < response.hits[0].recipe.healthLabels.length; h++){
        var heaLabEl = $("<li>")
            heaLabEl.text(response.hits[0].recipe.healthLabels[h])

            healthLabel.append(heaLabEl)
    }

    for(var i = 0; i < response.hits[0].recipe.ingredientLines.length; i++){
        var ingEl = $("<li>")
            ingEl.text(response.hits[0].recipe.ingredientLines[i])
            foodList.append(ingEl)

}

});

});
