import React from 'react';
import vader from '../static/vader.jpeg';
import '../index.css';

const Inbox = () => {
    return (
      <div className="image-div">
        <img className="image" src={vader} alt="Vader" />
      </div>
    );
}
export default Inbox;