const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');

const recipeDetailsContant = document.querySelector('.recipe-details-contant');
const recipeCloseBtn = document.querySelector('.recipe-close-Btn');


const fetchRecipes = async(query) => {
    recipeContainer.innerHTML = "<h2>Fetching recipes...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = "";

    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea} </span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span></p>
        `


        const button = document.createElement('button');
        button.textContent = "view Recipe"
        recipeDiv.appendChild(button);

        button.addEventListener('click' , ()=>{
            openRecipepopup(meal);

        });


        recipeContainer.appendChild(recipeDiv);
    });
  
}
const fetchIngredients = (meal) => {
   // console.log(meal);
   let ingredientList = "";
   for(let i=1; i<=20; i++){
    const ingredient = meal[`strIngredient${i}`];
    if(ingredient){
        const measure = meal[`strMeasure${i}`];
        ingredientList += `<li>${measure} ${ingredient}</li>`

    }
         else {
        break;
    }
   }
   return ingredientList;

}
const openRecipepopup = (meal) => {
    recipeDetailsContant.innerHTML = `

        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingridentList">${fetchIngredients(meal)}</ul>

        <div>
            <h3>Instructions:</h3>
            <p class="recipeInstruction">${meal.strInstructions}</p>
        </div>
    `
        recipeDetailsContant.parentElement.style.display = "block";

}






recipeCloseBtn.addEventListener('click', (e) =>{
    recipeDetailsContant.parentElement.style.display = "none";

});

searchBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
    //console.log("Button Clicked");


});