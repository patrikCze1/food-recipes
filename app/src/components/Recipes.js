import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import RecipeItem from "./RecipeItem";
import Loading from './Loading';

const RECIPES = gql`
  {
    search {
      results {
        id
        title
        image
      }
      totalResults
    }
  }
`;

function Recipes(props) {
  const { loading, error, data } = useQuery(RECIPES); //redux 

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  return (
    <ul className="collection">
      {data.search.results.map((recipe, index) => (
        <RecipeItem {...recipe} key={index} />
      ))}
    </ul>
  );
}

export default Recipes;
