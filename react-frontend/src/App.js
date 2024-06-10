import React, { useState } from 'react';
import './App.css';
import icon from './assets/icons/upload.svg';


function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [file, setFile] = useState(null);

  var pretrained = true;
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if(isSidebarOpen){
      changeText("Hello! Upload a picture.");
    }else{
      changeText("Check my profiles! :)");
    }
    
  };

  function changeText(message){
    let text = document.getElementsByClassName('text')[0];
    text.textContent = message;
    text.classList.remove('text');
    void text.offsetWidth; 
    text.classList.add('text');
  }


  function handleUploadClick(){
    if(!file){
      changeText("The input is empty...");
      return;
    }
    var input = document.getElementById("fileinput");
    var fileExtension = file.name.split('.').pop().toLowerCase();
    if(fileExtension !== 'png' && fileExtension !== 'jpg'){
      changeText("Choose a valid file!");
      input.value = '';
    }else{
      changeText("Doing some AI stuff...");
      input.value = '';
      backend_entry();
    }
  }

  function backend_entry(){
    const data = new FormData();
    data.append('img_file', file);
    data.append('mode', pretrained.toString());
    fetch("http://localhost:5000/upload",{method: 'POST', body: data}

    ).then(response => {
      return response.json();

   }).then(response_data => {
      console.log('Success:', response_data);
      changeText(random_phrase() + response_data.message + '.');
      setFile(null);

   }).catch(error => {
    console.error("Error:" + error);
   })
  }

  function random_phrase() {
    const min = Math.ceil(0); 
    const max = Math.floor(6); 
    const num = Math.floor(Math.random() * (max - min + 1)) + min; 
    console.log(num);
    switch (num) {
        case 1: return "Wow what a cool ";
        case 2: return "Hear me out on this:  ";
        case 3: return "What an amazing ";
        case 4: return "This is a awesome ";
        case 5: return "What a stunning ";
        case 6: return "Listen up, it's a ";
        default: return "i've got this a,  ";
    }
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
        <p className='text'>Hello! I predict pictures...</p>

        <input id="fileinput" type="file" className='file-input' style={{ '--clr': '#1e9bff' }} onChange={Handlefilechange}/>
        <div className='upload-btn' style={{ '--clr': '#1e9bff' }} onClick={handleUploadClick}>
          <span>Upload</span>
          <img src={icon} alt="upload icon" /> 
        </div>
      </div>
      
    </div>
  );
}

export default App;


