import React from 'react';
import './App.css';
import icon from './assets/icons/upload.svg'
import menu from './assets/icons/menu.svg'

function App() {
  return (
      <div className="App">
        <div className='menu-btn'>
          <img className='menu-icon' src={menu}/>
          
        
        </div> 

        <div className='center-container'>
          <p className='text'>Hello! Upload a picture.</p>
            <div className='upload-btn' style={{ '--clr': '#1e9bff' }}>
              <span>Upload</span>
              <img src={icon}/> 
            </div>
        </div>

        
          
        

      </div>
  );
}




export default App;

