import React from "react";
import PropTypes from "prop-types";

const RecipeItem = ({ id, title, readyInMinutes, servings, handleClick }) => {
  const imageSrc = `https://spoonacular.com/recipeImages/${id}-312x150.jpg`;
  return (
    <li className="collection-item">
      <span className="title">
        <h2>{title}</h2>
      </span>
      <div className="row">
        <div className="col s5">
          <img src={imageSrc} alt="Food image" width='312' height='150' />
        </div>

        <div className="col s7">
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
            </tbody>
          </table>
          <button className="btn right orange waves-effect" style={{marginTop: 5}} onClick={() => handleClick(id)}>
            Detail
          </button>
        </div>
      </div>
    </li>
  );
};

RecipeItem.propTypes = {
  title: PropTypes.string,
  imageSrc: PropTypes.string,
  readyInMinutes: PropTypes.number,
  servings: PropTypes.number,
};

export default RecipeItem;
