import React, { useState } from 'react';
import './App.css';
import icon from './assets/icons/upload.svg';



function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [file, setFile] = useState(null);
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  function handleUploadClick(){
    let text = document.getElementsByClassName('text')[0];
    if(!file){
      text.textContent = "Choose a file, dummy!";
      text.classList.remove('text');
      void text.offsetWidth; 
      text.classList.add('text');
      return;
    }
    
    text.textContent = "Doing some AI stuff...";
    text.classList.remove('text');
    void text.offsetWidth; 
    text.classList.add('text');
  }


  function Handlefilechange(event){
    var selectedfile = event.target.files[0]
    if(selectedfile){
      setFile(selectedfile);
    }
  }

  
  return (
    <div className={`App ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <label>
        <input
          className='X' 
          type="checkbox"
          checked={isSidebarOpen}
          onChange={toggleSidebar}
        />  
        <div className='toggle' style={{ '--clr': '#1e9bff' }}>
          <span className='topline c'></span>
          <span className='middleline c'></span>
          <span className='bottomline c'></span>
        </div>
        <div className='slide-bar'>
          <ul>
            <li><a href='https://github.com/Antonlindkvist/portfolio/tree/master'>GitHub</a></li>
            <li><a href='https://linkedin.com/in/antonlindkvist100'>LinkedIn</a></li>
            <li><a href='#'>Resume</a></li>
            <li><a href='#'>The projekt</a></li>
          </ul>
        </div>
      </label>

      <div className='center-container'>
        <p className='text'>Hello! Upload a picture.</p>

        <input type="file" className='file-input' style={{ '--clr': '#1e9bff' }} onChange={Handlefilechange}/>
        <div className='upload-btn' style={{ '--clr': '#1e9bff' }} onClick={handleUploadClick}>
          <span>Upload</span>
          <img src={icon} alt="upload icon" /> 
        </div>
      </div>
      
    </div>
  );




}






export default App;


