function showFood() {
    const inputField = document.getElementById('input-food');
    const searchText = inputField.value;
    console.log(searchText);
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

    console.log(url);
    inputField.value = '';

    fetch(url)
        .then(response => response.json())
        .then(data => showMeals(data.meals));
};


const showMeals = meals => {
    console.log(meals);
    const displayDiv = document.getElementById('food-div');

    displayDiv.textContent = '';

    meals.forEach(meal => {

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="showIndividualMeal(${meal.idMeal})" class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                        </div>
                    </div>
        `;
        displayDiv.appendChild(div);
    });
};

const showIndividualMeal = indMeal => {
    console.log(indMeal);

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${indMeal}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayMealIndDetail(data.meals[0]))
}

const displayMealIndDetail = indMealFetch => {
    const showIndDiv = document.getElementById('show-individual-food');

    showIndDiv.textContent = '';

    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${indMealFetch.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${indMealFetch.strMeal}</h5>
        <p class="card-text">${indMealFetch.strInstructions.slice(0, 150)}</p>
        <a href="${indMealFetch.strYoutube}" class="btn btn-danger" target="_blank">Check Recipe on Youtube</a>
    </div>
    `
    showIndDiv.appendChild(div);

}