import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdSave, MdAccountCircle } from 'react-icons/md';

const params = window.location.search;
const searchFromURL = new URLSearchParams(params).get('q');
const cuisineTypeFromURL = new URLSearchParams(params).get('c');

const Nav = () => {
  const [searchValue, setSearchValue] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  // const [results, setResults] = useState([]);

  useEffect(() => {
    searchFromURL ? setSearchValue(searchFromURL) : setSearchValue('');
    cuisineTypeFromURL ? setCuisineType(cuisineTypeFromURL) : setCuisineType('American');
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location = `/recipes?q=${searchValue}&c=${cuisineType}`
  }

  return (
    <nav className="shadow-lg">
      <div className="flex justify-center bg-gray text-white px-4 py-2">
        <h1 className="font-poppins text-3xl m-0 whitespace-nowrap grid place-items-center">Recipe Book</h1>

        <form onSubmit={(e) => handleSubmit(e)} className="search-container w-full my-1 flex justify-center relative">
          <select value={cuisineType} onChange={(e) => {setCuisineType(e.target.value)}} className="text-black text-center rounded-l-full border-r border-black w-24" name="category" id="category">
            <option value="American">American</option>
            <option value="Asian">Asian</option>
            <option value="British">British</option>
            <option value="Caribbean">Caribbean</option>
            <option value="Central Europe">Central Europe</option>
            <option value="Chinese">Chinese</option>
            <option value="Eastern Europe">Eastern Europe</option>
            <option value="French">French</option>
            <option value="Indian">Indian</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Kosher">Kosher</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Mexican">Mexican</option>
            <option value="Middle Eastern">Middle Eastern</option>
            <option value="Nordic">Nordic</option>
            <option value="South American">South American</option>
            <option value="South East Asian">South East Asian</option>
          </select>
          <input className="searchInput px-4 h-full w-8/12 text-black" value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}} type="text" placeholder="Search recipes" />
          <button type="submit" className="h-full bg-accent px-4 rounded-r-full w-24">Search</button>
        
          {/* <div className="results absolute top-full w-full left-0">
            {results.map(result => {
              const {recipe} = result;
              const recipeURL = `recipe?id=${recipe.uri.split('#')[1]}`;
              return (
                <Link to={recipeURL} onClick={() => {setResults([]); this.forceUpdate();}} className="result first-of-type:pt-1" key={recipe.uri}>
                  <img className="height-12 w-12 mx-1 mb-1" src={recipe.image} alt={recipe.label} />
                  {recipe.label}
                </Link>
              )
            })}
          </div> */}
        </form>


        <div className="flex gap-4">
          <button><MdSave className="text-2xl mx-auto" /> Saved</button>
          <button><MdAccountCircle className="text-2xl mx-auto" />Account</button>
        </div>
      </div>

      <div className="flex bg-gray-dark text-white">
        <ul className="flex mx-4 py-1 navigation">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
          <li>
            <Link to="/about">put</Link>
          </li>
          <li>
            <Link to="/about">every</Link>
          </li>
          <li>
            <Link to="/about">other</Link>
          </li>
          <li>
            <Link to="/about">link</Link>
          </li>
          <li>
            <Link to="/about">here</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav;