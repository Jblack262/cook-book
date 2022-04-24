import React, { useState, useEffect } from 'react';
import {AiOutlineArrowRight} from 'react-icons/ai';
import { TailSpin } from 'react-loading-icons';

const Home = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFavorites = async (search, cuisine) => {
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
        .then(response => setFavorites(response.hits))
        .then(() => setLoading(false))
        .catch(err => console.error(err));
      } catch (e) {
        console.error(e);
      }
    }

    getFavorites('Apple Pie', 'American')
  }, []);
  
    return (
      <div>
        <div className="info-banner flex my-4 black">
          <div className="flex flex-col flex-shrink-0 p-4 max-w-card bg-white">
            <img className="rounded-lg block h-48 w-48" src="https://thispersondoesnotexist.com/image" alt="random person's face" />
            <h1 className="text-xl mt-2">Hi, I do not exist! But here I have made a fake site about fake food... Enjoy!</h1>
          </div>
          <div className="flex flex-col relative">
            <p className="m-4 text-lg">Welcome! Recipe Book is an Arizona food blog by some nerd, focused on healthy recipes for everyday. It features over 2.3 million recipes, most of which suck a lot.</p>
            <p className="m-4 text-lg">I've also written 834,038 cookbooks, and am a Best Selling author on Mars. Below you'll see some of my favorite recipes. There are lots of vegan recipes, vegetarian recipes, Instant Pot recipes, and WFPB recipes. Please enjoy!</p>
            <p className="m-4 text-lg">I poured my heart and soul into making these recipes. Each one took me exactly 3 hours, 28 minutes, and 37 seconds. Meaning this whole list of recipes took 8,000,000 hours of work. Please appreciate my hard work.</p>
            <a href="/recipes" className="w-max flex items-center gap-2 bg-accent text-white m-4 ml-auto px-4 py-2 rounded-md shadow-sm hover:shadow-md hover:bg-accent-1">Browse Recipes</a>
          </div>
        </div>

        <div>
          <h1 className="text-center text-3xl font-bold my-4">Some of my favorites</h1>
          <div className="container flex justify-center gap-4 max-w-full mx-auto">
            {loading && <TailSpin className="m-4 mx-auto" stroke="#000000" />}
            {!loading && favorites.slice(0, 4).map((recipeObj, index) => {
            const {recipe} = recipeObj;
            const recipeLink = `/recipe?id=${recipe.uri.split('_')[1]}`;
              return (
                <div key={index} className="card flex flex-col w-max max-w-card-2 overflow-hidden bg-gray-dark text-white rounded-lg">
                  <img className="block mb-4 shadow-md w-52" src={recipe.images.REGULAR.url} alt={recipe.label} />
                  <h1 className="text-center text-xl mb-2">{recipe.label}</h1>
                  <a href={recipeLink} className="w-max flex items-center gap-2 bg-accent text-white mx-auto my-4 mt-auto px-4 py-2 rounded-md shadow-sm hover:shadow-md hover:bg-accent-1">View Recipe <AiOutlineArrowRight className="m-0" /></a>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
}

export default Home
