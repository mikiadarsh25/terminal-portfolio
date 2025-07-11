import React from 'react';
import './IDCard.css';

const IDCard = () => {
  return (
    <div className="idcard-container">
      <div className="idcard-rope"></div>
      <div className="idcard-card">
        <img
          src="https://via.placeholder.com/160x180.png?text=Test+Image"
          alt="Test"
          className="idcard-photo"
        />
        <div className="idcard-info">
          <h2 className="idcard-name">Adarsh Prakash</h2>
          <p className="idcard-label">Software Engineer</p>
        </div>
      </div>
    </div>
  );
};

export default IDCard; 