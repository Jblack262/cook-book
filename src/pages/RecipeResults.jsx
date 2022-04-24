import React, { useState, useEffect } from 'react';
import { TailSpin   } from 'react-loading-icons';
import {AiOutlineArrowRight} from 'react-icons/ai';

const params = window.location.search;
const searchQuery = new URLSearchParams(params).get('q');
const cuisineType = new URLSearchParams(params).get('c');

function RecipeResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log(searchQuery);

    const getRecipes = async (search, cuisine) => {
      try{
        console.log('loading')
      const options = {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      };
  
      return fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${search}&cuisineType=${cuisine}&app_id=fbb60a93&app_key=6aa67f3fe0cd0a275a805ec90ec608d3`, options)
        .then(response => response.json())
        // .then(response => response.hits)
        .then(response => setResults(response.hits))
        .then(() => setLoading(false))
        .catch(err => console.error(err));
      } catch (e) {
        console.error(e);
      }
    }

    searchQuery && cuisineType ? getRecipes(searchQuery, cuisineType) : setLoading(false);
    // getRecipes(searchQuery, cuisineType)
  }, []);

    return (
      <div>
        {!searchQuery && <h1 className="text-center text-2xl font-bold my-8">Use the search bar to find recipes!</h1>}
        {loading && <TailSpin className="m-4 mx-auto" stroke="#000000" />}
        <div className="recipesContainer flex flex-col gap-4 my-4">
          {results.map((result, index) => {
            const {recipe} = result;
            const recipeLink = `/recipe?id=${recipe.uri.split('_')[1]}`
            return (
              <div className="recipe flex bg-gray-light w-10/12 mx-auto shadow-md rounded-md overflow-hidden relative" key={index}>
                <img className="h-52 w-52 object-cover" src={recipe.images.REGULAR.url} alt={recipe.label} />
                <div className="info w-full px-10 py-4">
                  <h1 className="text-3xl">{recipe.label}</h1>
                  <ul>
                    <li>cuisine type: {recipe.cuisineType}</li>
                    <li>meal type: {recipe.mealType}</li>
                    <li>dish type: {recipe.dishType}</li>
                    <li>calories: {Math.round(recipe.calories)}</li>
                    <li>weight: {Math.round(recipe.totalWeight)} grams</li>
                  </ul>
                </div>
                {/* <a onClick={() => {saveRecipe()}} href={recipeLink} className="absolute right-0 bottom-0 flex items-center gap-2 bg-accent text-white m-4 px-4 py-2 rounded-md shadow-sm hover:shadow-md hover:bg-accent-1">View Recipe <AiOutlineArrowRight className="m-0" /></a> */}
                <a href={recipeLink} className="absolute right-0 bottom-0 flex items-center gap-2 bg-accent text-white m-4 px-4 py-2 rounded-md shadow-sm hover:shadow-md hover:bg-accent-1">View Recipe <AiOutlineArrowRight className="m-0" /></a>
              </div>
            )
          })}
        </div>
      </div>
    )
}

export default RecipeResults;
