var myRecipes = [];
var apiData = document.getElementById("apiData");
getRecipes("pizza");

var links = document.querySelectorAll(".nav-item");
for(var i=0;i<links.length;i++)
{
  links[i].addEventListener("click",function(e)
  {
    getRecipes(e.target.text);
  });
}
/*function getRecipes(meal) هاي طريقة ال ajax 
{
  var httpRequest =  new XMLHttpRequest() ;
  httpRequest.open("GET",`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
  httpRequest.send();

  httpRequest.addEventListener("readystatechange",function()
  {
     if (httpRequest.readyState == 4 && httpRequest.status == 200)
     {
       myRecipes = JSON.parse(httpRequest.response).recipes;
       displayData();
     }
  });
}*/
async function getRecipes(meal)
{
   var response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
   var data = await response.json();
   myRecipes = data.recipes;
   displayData();
}

function displayData()
{
    var result = '';
    for(var i=0;i<myRecipes.length;i++)
    {
        result += `
        <div class="col-md-3">
        <h3>${myRecipes[i].title}</h3>
        <img class="w-100" src="${myRecipes[i].image_url}">
        <button type="button" data-bs-toggle="modal" data-bs-target="#recipeModal"
        class="btn btn-outline-warning" onclick="openDetails(${myRecipes[i].recipe_id})">Details</button>
        </div>
        `;
    }
    apiData.innerHTML = result;
}
async function openDetails(e)
{
  var response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${e}`);
  var data = await response.json();
  var recipeData = data.recipe;
  var ingredient = recipeData.ingredients;
  var list = '';
  for(var i=0;i<ingredient.length;i++)
  {
    list +=`
    <li> ${ingredient[i]}</li>
    `;
  }
  var result = 
  `
  <h2>${recipeData.title}</h2>
  <img src="${recipeData.image_url}" class="w-100" />
  <p> rank is ${recipeData.social_rank}</p>
   <ul>
   ${list}
   </ul>
  `;
  document.getElementById("recipeData").innerHTML = result;
}
