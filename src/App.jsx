import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import {links} from './utils/consts';

//pages
import {Home, RecipeResults, Recipe, About} from './pages/index';

//components
import {Nav} from './components/index';

function App() {

  return (
    <Router>
      <div>
        <Nav/>
        <Routes>
          {/* <Route path=":teamId" element={<Team />} /> */}
          <Route path="recipes" element={<RecipeResults />} />
          <Route path="recipe" element={<Recipe />} />
          <Route path="about" element={<About />} />
          <Route index element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
