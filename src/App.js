import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import { mockData } from './utils/data';
import './App.css'; 

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentVideo, setCurrentVideo] = useState(null);
  const currentVideoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentFormVisible, setCommentFormVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); 

  const fixedFollowersCount = "1M followers"; 
  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredRecipes = mockData.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm)
  );

  const handlePlay = (recipe) => {
    setCurrentVideo(recipe);
    setIsPlaying(true);
  };

  const handleHomeClick = () => {
    setCurrentVideo(null);
    setLiked(false);
    setFollowed(false);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      currentVideoRef.current.pause();
    } else {
      currentVideoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleCommentToggle = () => {
    setCommentFormVisible(!commentFormVisible);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const comment = event.target.elements.comment.value.trim();
    if (comment) {
      setComments([...comments, comment]);
      event.target.reset();
    }
  };

  const handleFollow = () => {
    setFollowed(true);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); 
  };

  useEffect(() => {
    if (currentVideo && currentVideoRef.current) {
      currentVideoRef.current.play();
      setIsPlaying(true);
    }
  }, [currentVideo]);

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <Navbar 
        onSearch={handleSearch} 
        onHomeClick={handleHomeClick} 
        toggleDarkMode={toggleDarkMode} 
        isDarkMode={isDarkMode} 
      />

      <div className="container mt-4 d-flex flex-column">
        {currentVideo ? (
          <div className="video-section flex-grow-1 position-relative" style={{ height: '70vh' }}>
            <video
              ref={currentVideoRef}
              className="video-player"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              controls
              onClick={togglePlayPause}
            >
              <source src={currentVideo.videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Info and Controls */}
            <div className="video-info mt-3">
              <div className="d-flex align-items-center">
                <img
                  src={currentVideo.avatar}
                  alt={currentVideo.username}
                  className="rounded-circle"
                  style={{ width: '50px', height: '50px' }}
                />
                <div className="ms-3">
                  <h5>{currentVideo.username}</h5>
                  <p className="text-muted">{fixedFollowersCount}</p>
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-start">
                <button
                  className={`btn me-2 ${liked ? 'btn-success' : 'btn-outline-primary'}`}
                  onClick={handleLike}
                >
                  <i className="fa fa-thumbs-up"></i> {liked ? 'Liked' : 'Like'}
                </button>
                <button
                  className="btn btn-outline-secondary me-2"
                  onClick={handleCommentToggle}
                >
                  <i className="fa fa-comment"></i> Comment
                </button>
                <button
                  className={`btn ${followed ? 'btn-secondary' : 'btn-outline-success'}`}
                  onClick={handleFollow}
                  disabled={followed}
                >
                  <i className="fa fa-user-plus"></i> {followed ? 'Following' : 'Follow'}
                </button>
              </div>
              {commentFormVisible && (
                <div className="comment-form mt-3">
                  <h5>Comments</h5>
                  <form onSubmit={handleCommentSubmit}>
                    <div className="mb-3">
                      <textarea
                        name="comment"
                        className="form-control"
                        rows="3"
                        placeholder="Add a comment..."
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                  {comments.length > 0 && (
                    <ul className="mt-3">
                      {comments.map((comment, index) => (
                        <li key={index} className="border-bottom py-2">{comment}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="row">
            <RecipeList
              recipes={filteredRecipes}
              onPlay={handlePlay}
              currentVideoRef={currentVideoRef}
              className="d-flex flex-wrap" // Ensure grid layout
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
