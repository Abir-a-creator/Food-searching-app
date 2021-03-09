import React, { useState } from 'react';
import Axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import Recipe from './Component/Recipe';
import Alert from "./Component/Alert";
import './App.css';

const App = () => {
  const[query,setQuery] = useState("");
  const [recipes, setRecepices] = useState([]);
  const [alert,setAlert] = useState("");

  const APP_ID = "033f04a3";
  const APP_KEY = "cba4734c835aee734e72f2ba1c50e9cc";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
  
  const getData = async () => {
    if (query !== "") { 
    const result = await Axios.get(url);
    if (!result.data.more) {
      return setAlert("No food with such name");
    }
    console.log(result);
    setRecepices(result.data.hits);
    setQuery("");
    setAlert("");
  } else{
    setAlert("Please fill the form");
  }
};

  const onChange = e => {
    setQuery(e.target.value)
  };

  const onSubmit= (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="App">
      <h1>Food Searching</h1>
      <form  onSubmit={onSubmit} className="search-form">
        {alert !== "" && <Alert alert={alert} />} 
      <input 
      type="text" 
      name="query"
      onChange={onChange}
      value={query}
      autoComplete="off" 
      placeholder="Search Food" 
      />
      <input type="submit" value="search"/>
      </form>
      <div className="recipes">
        {recipes !== [] && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
}

export default App;
