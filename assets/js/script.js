$("#foodForm").on("submit",function(event){
    event.preventDefault();
    var foodName = $("#inputSearch").val()
    $("#inputSearch").val("")

    var queryUrl = "https://api.edamam.com/search?q="+foodName+"&app_id=835f0cdb&app_key=ff6b03d8611201ee1634b8b112310c42&from=0&to=3&calories=500&health=alcohol-free"

$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function(response){

    var main= $("#mainContent")
        main.attr("style","border: dotted; margin-bottom: 40px; padding:20px;")
    var foodTitle =$("<h5>")
        foodTitle.text(response.hits[0].recipe.label)
    var img = $("<img>")
        img.attr("src",response.hits[0].recipe.image)
    var foodList =$("<ul>")
        foodList.attr("style","border: double;")
        foodList.text("Ingredients: ")
        console.log(foodList)
    $("#foodImg").append(img)
    $("#foodDes").append(foodTitle)
    $("#foodDes").append(foodList)
    for(var i = 0; i < response.hits[0].recipe.ingredientLines.length; i++){
    
        var ingEl = $("<li>")
            ingEl.text(response.hits[0].recipe.ingredientLines[i])
   
            $(foodList).append(ingEl)

 } 
 
});

});
