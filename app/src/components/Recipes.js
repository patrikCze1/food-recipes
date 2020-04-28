import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import RecipeItem from "./RecipeItem";
import Recipe from "./Recipe";
import Loading from "./Loading";
import Header from "./Header";

const RECIPES = gql`
  query searchList($offset: Int!, $query: String!) {
    search(offset: $offset, query: $query) {
      results {
        id
        title
        image
        readyInMinutes
        servings
      }
      totalResults
    }
  }
`;

function Recipes(props) {
  const [offset, setOffset] = useState(0);
  const [showRecipe, setShowRecipe] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [query, setQuery] = useState("");

  const { loading, error, data } = useQuery(RECIPES, {
    variables: { offset, query },
  });

  const handleClick = (id) => {
    setSelectedId(id);
    setShowRecipe(true);
    
    window.scrollTo(0, 150)
  };

  const randomRecipe = () => {
    const randomNumber =
      Math.floor(Math.random() * data.search.totalResults) + 1;
    handleClick(randomNumber);
  };

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Header setQuery={setQuery} />
      <div className="my-container">
        {
          query? 
          <h4>Searched: "{query}"</h4>
          :
          ''
        }
        <h4>Total results: {data.search.totalResults.toLocaleString()}</h4>
        <button
          onClick={() => randomRecipe()}
          className="waves-effect waves-orange btn-flat"
        >
          Random
        </button>

        <div className={showRecipe ? "recipes-hidden" : ""}>
          <ul className="collection">
            {data.search.results.map((recipe, index) => (
              <RecipeItem {...recipe} handleClick={handleClick} key={index} />
            ))}
          </ul>
        </div>
        {showRecipe ? (
          <div className="recipe-modal">
            <div className="recipe-detail">
              <i
                className="medium material-icons"
                onClick={() => setShowRecipe(false)}
              >
                close
              </i>
              <Recipe id={selectedId} />
            </div>
          </div>
        ) : (
          ""
        )}

        <ul className="pagination center">
          {offset > 0 ? (
            <li className="disabled">
              <button
                onClick={() => setOffset(offset - 1)}
                className="waves-effect waves-orange btn-flat"
              >
                <i className="material-icons">chevron_left</i>
              </button>
            </li>
          ) : (
            ""
          )}
          <li className="active">
            <span style={{ padding: 5 }}>{offset + 1}</span>
          </li>
          <li className="waves-effect">
            <button
              onClick={() => setOffset(offset + 1)}
              className="waves-effect waves-orange btn-flat"
            >
              <i className="material-icons">chevron_right</i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Recipes;
