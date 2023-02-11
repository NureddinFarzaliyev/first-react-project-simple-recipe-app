import React, { useEffect } from 'react';
import "./App.css";

function App() {
  const getRecipe = async (query) => {
    document.querySelector('#recipes').innerHTML = null; // remove value of input

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const data = await response.json(); // gets data and json it
    const parent = document.querySelector('#recipes')

    if (data.meals == null) {
      parent.innerHTML = "No dishes found. Try Again.";
    } else {
      let i = 0
      for (i == 0; i < data.meals.length; i++) {
        // main recipe element and link
        let main = document.createElement('a')
        main.setAttribute('href', createRecipe(data, i).source)
        main.classList.add('main')
        // title
        let titleDiv = document.createElement('h2')
        titleDiv.innerHTML = createRecipe(data, i).title;
        main.appendChild(titleDiv)
        //image
        let imageDiv = document.createElement('img')
        imageDiv.setAttribute("src", createRecipe(data, i).image)
        imageDiv.setAttribute('width', "200")
        main.appendChild(imageDiv)
        // instructions
        let ins = document.createElement('p')
        ins.innerHTML = createRecipe(data, i).ins
        main.appendChild(ins);

        parent.appendChild(main)
      }
    }
  }


  function createRecipe(data, i) {
    let item = {
      title: data.meals[i].strMeal,
      image: data.meals[i].strMealThumb,
      ins: data.meals[i].strInstructions,
      source: data.meals[i].strSource
    }
    return item;
  }


  return (
    <div className='App'>
      {/* e.target.title */}
      <form title='clicked' onSubmit={(e) => { getRecipe(document.querySelector('#input').value); e.preventDefault() }}>
        <input type="text" id='input' />
        <button title="hello">Search</button>
      </form>
      <div id='recipes'>
      </div>
    </div >
  )
}

export default App;