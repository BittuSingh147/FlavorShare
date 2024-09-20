import React from 'react';
import PropTypes from 'prop-types';

const RecipeCard = ({ recipe, onPlay }) => {
  return (
    <div
      className="col-md-4 mb-4"
      onClick={() => onPlay(recipe)} // Play video when the card is clicked
      style={{ cursor: 'pointer' }} // Change cursor to pointer
    >
      <div className="card shadow-sm" style={{ height: '100%' }}> {/* Ensure uniform height */}
        {/* Video preview (with fixed height) */}
        <video width="100%" height="200" muted style={{ objectFit: 'cover' }}>
          <source src={recipe.videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text">{recipe.description}</p>
          <div className="d-flex align-items-center mt-2">
            <img
              src={recipe.avatar}
              alt={recipe.username}
              className="rounded-circle"
              style={{ width: '25px', height: '25px' }}
            />
            <div className="ms-2">
              <span>{recipe.username}</span>
              <div>
                {recipe.views} • {recipe.daysAgo}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    videoSrc: PropTypes.string.isRequired, // MP4 video source
    description: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    views: PropTypes.string.isRequired,
    daysAgo: PropTypes.string.isRequired,
  }).isRequired,
  onPlay: PropTypes.func.isRequired,
};

export default RecipeCard;
