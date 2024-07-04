import React, { useState } from 'react';
import Popup from './components/Popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSaveSegmentClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="App"> 
      <div className="sidebar">    
      <h3 className='iconfont '><span className='iconpading' ><FontAwesomeIcon icon={faChevronLeft} /></span>View Audience</h3>
        <button className='save-btn' onClick={handleSaveSegmentClick}>Save segment</button>
      </div>
      <div className="main-content">
        {showPopup && <Popup closePopup={closePopup} />}
      </div>
    </div>
  );
}

export default App;
