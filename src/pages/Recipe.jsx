import React, { useEffect, useState } from 'react';
import { TailSpin   } from 'react-loading-icons';

const params = window.location.search;
const recipeID = new URLSearchParams(params).get('id');

const Recipe = () => {
  const [recipe, setRecipe] = useState(undefined);
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const getRecipes = async (id) => {
      try{
        const options = {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        };
    
        return fetch(`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=fbb60a93&app_key=6aa67f3fe0cd0a275a805ec90ec608d3`, options)
          .then(response => response.json())
          .then(response => setRecipe(response.recipe))
          // .then(response => console.log(response.recipe))
          // .then(() => console.log(recipe))
          .then(() => setLoading(false))
          .catch(err => console.error(err));
      } catch (e) {
        console.error(e);
      }
    }

    getRecipes(recipeID);
  }, []);
  return (
    <div>
      {loading && <TailSpin className="m-4 mx-auto" stroke="#000000" />}
      {!loading && <div className="max-w-screen-md mx-auto my-4 shadow-md">
        <div className="row flex p-4 border-b">
          <img className="mx-auto max-h-300 rounded-md shadow-md" src={recipe.image} alt={recipe.label} />
          <div className="w-full px-4 flex flex-col justify-center items-center">
            <h1 className="text-center text-3xl">{recipe.label}</h1>
            <p className="my-4">See full recipe on <a href={recipe.url} className="underline">{recipe.source}</a></p>
            <p className="font-bold text-lg mb-2">Health Labels</p>
            <ul className="w-full max-h-40 flex flex-col flex-wrap">
              {!loading && recipe.healthLabels.map((label, index) => {
                return (
                  <li className="text-left" key={index}>{label}</li>
                )
              })}
            </ul>
            <button className="mt-auto bg-accent text-white px-3 py-2 my-2 rounded-md hover:bg-accent-1">Save Recipe</button>
          </div>
        </div>
        <div className="row flex flex-wrap justify-around py-4 mx-4 border-b">
          <ul className="w-2/6 list-square px-6">
            <li className="text-2xl border-b font-bold list-none">{recipe.ingredients.length} Ingredients</li>
            {recipe.ingredientLines.map((ingredient, index) => {
              return (
                <li key={index}>{ingredient}</li>
              )
            })}
          </ul>
          <ul className="w-2/6 px-6">
            <li className="text-2xl border-b font-bold">Nutrition</li>
            <li>{recipe.yield} Servings</li>
            <li>{Math.round(recipe.calories / recipe.yield)} calories/serving</li>
            <li>{Math.round(2500 / Math.round(recipe.calories / recipe.yield))}% daily value</li>
          </ul>
          <ul className="w-2/6 px-6">
            <li className="text-2xl border-b font-bold">Preparation</li>
            <li><a href={recipe.url} className="block w-max bg-accent text-white px-3 py-2 my-2 rounded-md hover:bg-accent-1">Instructions</a></li>
          </ul>
        </div>
        <div>
          <ul className="flex flex-wrap">
            {!loading && recipe.digest.map(nutrient => {
              const {label, sub, tag, total, unit} = nutrient;
              return (
                <li key={tag} className="w-3/6 px-8 my-2">
                  <div className="label flex justify-between">
                    <p>{label}</p>
                    <p>{Math.round(total / recipe.yield)} {unit}</p>
                  </div>
                  <ul className="ml-4">
                    {sub && sub.map(nutrient => {
                      const {label, total} = nutrient;
                      return (
                        <li className="flex justify-between" key={label}>
                          <p>{label}</p>
                          <p>{Math.round(total / recipe.yield)} {unit}</p>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </div>
      </div>}
    </div>
  )
}

export default Recipe