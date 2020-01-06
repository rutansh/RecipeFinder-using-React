import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe';

 const App=()=> {
  const APP_ID="appid";
  const APP_KEY="key";
  const[recipes,setRecipes]=useState([]);  
  const[search,setSearch]=useState(''); 
  const [query,setQuery]=useState('chicken');
  useEffect(()=>{
    getRecipes();
  },[query]);
  const getRecipes=async ()=>{
    const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data=await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
  };
  const updateSearch=e=>{
    setSearch(e.target.value);
    console.log(search);
  };
  const getSearch=e=>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  return (

    <div className="App">
    <form onSubmit={getSearch} className="search-form">
      <input className="search-bar" type="text" value={search} onChange={updateSearch}></input>
      <button  className="search-button" type="submit">Search</button>
    </form>
    <div className="container">
    <div className="row">
    <div classname="recipes" className="col-md-4">
    {recipes.map(recipe=>(
    <Recipe 
    key={recipe.recipe.image}
    title={recipe.recipe.label} 
    calories={recipe.recipe.calories}
    image={recipe.recipe.image}
    ingredients={recipe.recipe.ingredients}
    />))};
    </div>
    </div>
    </div>
    </div>
  );
}

export default App;
