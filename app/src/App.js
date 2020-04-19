import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Recipes from "./components/Recipes";
import Recipe from "./components/Recipe";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />

        <div className="container">
          <Recipes />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
//https://spoonacular.com/food-api/docs#Cuisines
