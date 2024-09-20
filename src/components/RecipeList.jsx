import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, onPlay }) => {
  return (
    <>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onPlay={onPlay} />
      ))}
    </>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      videoSrc: PropTypes.string.isRequired, 
      description: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      views: PropTypes.string.isRequired,
      daysAgo: PropTypes.string.isRequired,
    })
  ).isRequired,
  onPlay: PropTypes.func.isRequired,
};

export default RecipeList;
