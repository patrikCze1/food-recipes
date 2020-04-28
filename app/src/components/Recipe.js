import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import Ingreident from "./Ingredient";
import Loading from './Loading';

const RECIPE = gql`
  query RecipeDetail($id: Int!) {
    recipe(id: $id) {
      title
      image
      servings
      readyInMinutes
      vegan
      vegetarian
      cuisines
      dishTypes
      extendedIngredients {
        name
        original
        measures {
          metric {
            amount
            unitShort
          }
        }
      }
    }
  }
`;

const Recipe = ({id}) => {
  const { loading, error, data } = useQuery(RECIPE, {
    variables: { id }, 
  });

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  const {
    title,
    image,
    servings,
    vegan,
    vegeatrian,
    dishTypes,
    extendedIngredients,
    readyInMinutes,
  } = data.recipe;

  return (
    <div>
      <h1 style={{marginTop: 10}}>{title}</h1>      

      <div className="row">
        <div className="col s6">
          <img src={image} alt="Food" className="responsive-img" />
        </div>

        <div className="col s6">
          <table>
            <tbody>
              <tr>
                <td>
                  <b>Serving (ppl)</b>
                </td>
                <td>{servings}</td>
              </tr>
              <tr>
                <td>
                  <b>Ready in (min)</b>
                </td>
                <td>{readyInMinutes}</td>
              </tr>
              <tr>
                <td>
                  <b>Vegetarian</b>
                </td>
                <td>
                  {vegeatrian ? (
                    <i className="tiny material-icons">done</i>
                  ) : (
                    <i className="tiny material-icons">clear</i>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Vegan</b>
                </td>
                <td>
                  {vegan ? (
                    <i className="tiny material-icons">done</i>
                  ) : (
                    <i className="tiny material-icons">clear</i>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Type</b>
                </td>
                <td>
                  {dishTypes.map((type, index) => (
                    <span key={index}>{type}</span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
          
        </div>
      </div>

      <h2>Ingredients</h2>
      <div className="row">
        {extendedIngredients.map((ingreident, index) => (
          <Ingreident {...ingreident} />
        ))}
      </div>
    </div>
  );
};

Recipe.propTypes = {
  title: PropTypes.string,
};

export default Recipe;
