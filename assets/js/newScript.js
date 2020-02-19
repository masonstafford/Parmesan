$("#foodForm").on("submit",function(event){
    event.preventDefault();
    var foodName = $("#inputSearch").val()
    $("#inputSearch").val("")
    $("#recipeArea").empty()
    // if(!foodName){
    //     return
    // }
    var queryUrl = "https://api.edamam.com/search?q="+foodName+"&app_id=835f0cdb&app_key=ff6b03d8611201ee1634b8b112310c42&from=0&to=3&calories=500&health=alcohol-free"

$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function(response){

    var main = $("#recipeArea")
    var foodCard = $("<div class='foodCard card'>")
    var foodRow = $("<div class='columns foodRow'>")
    var foodTitle = $("<h1>")
        foodTitle.text(response.hits[0].recipe.label)
    var foodRow2 = $("<div class='columns foodRow2'>")
    // var recipeBox = $("<div class='columns'>")
    // var foodRow3 = $("<div class='columns'>")
    // var foodCol3 = $("<div class='column is-6'>")
    var foodCol1 = $("<div class='column is-6'>")
    var imgEl = $("<img class= 'imgEl'>")
        imgEl.attr("src",response.hits[0].recipe.image)
    var foodCol2 = $("<div class='column column2 is-6'>")
    var healthLabel = $("<ul class=' ulEl menu-list'>")
        healthLabel.text("Health Labels: ")
    var nutritionalContent = $("<ul class=' ulEl nutrition-list'>")
        nutritionalContent.text("Nutritional Content: ")
    var calEl = $("<div class='column'>")
        calEl.text("Calories: " + response.hits[0].recipe.calories.toFixed(0)+ " KCAL")
    var fatEl = $("<div class='column'>")
        fatEl.text("Fat: " + response.hits[0].recipe.totalNutrients.FAT.quantity.toFixed(0)+" G")
    var proteinEl =$("<div class='column'>")
        proteinEl.text("Protein: " + response.hits[0].recipe.totalNutrients.PROCNT.quantity.toFixed(0)+" G")
    var foodList = $("<ul>")
    //foodList.attr("style","border: dotted;")
    var iframeEl = $("<iframe class = 'iframe'>") 
    var sourceLink = response.hits[0].recipe.url
    // iframeEl.attr("width","100%","height","50%")
        iframeEl.attr("src",response.hits[0].recipe.url)
        console.log(sourceLink);


    main.prepend(foodCard)
    foodCard.append(foodRow)
    foodRow.append(foodTitle)
    foodCard.append(foodRow2) 
    foodRow2.append(foodCol1)
    foodCol1.append(imgEl)
    foodRow2.append(foodCol2)
    foodCol2.append(healthLabel)
    // foodCol2.append(foodList)
    // foodRow3.append(foodCol3)
    foodCol2.append(nutritionalContent)
    nutritionalContent.append(calEl)
    nutritionalContent.append(fatEl)
    nutritionalContent.append(proteinEl)
    foodCard.append(foodList)
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
