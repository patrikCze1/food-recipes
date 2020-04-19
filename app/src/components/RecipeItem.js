import React from "react";
import PropTypes from "prop-types";

const RecipeItem = ({ id, title }) => {
  const imageSrc = `https://spoonacular.com/recipeImages/${id}-312x150.jpg`;
  return (
    <li class="collection-item avatar">
      <img src={imageSrc} alt='Food image' />
      <span class="title">
        <h2>{title}</h2>
      </span>
    </li>
  );
};

RecipeItem.propTypes = {
  title: PropTypes.string,
  imageSrc: PropTypes.string,
};

export default RecipeItem;
