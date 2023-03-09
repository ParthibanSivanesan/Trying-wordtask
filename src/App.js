import * as React from 'react';
import './index.css'
import {  Routes, Route } from 'react-router-dom';

import Home from './Home';
import Easy  from './Easy';
import Hard from './Hard';
// import CorrectAnswer from './Sounds/CorrectAnswer.mp3'
// import IncorrectAnswer from './Sounds/IncorrectAnswer.mp3'
// import Winaudio from './Sounds/Winaudio.mp3'
// import Failaudio from './Sounds/Failaudio.mp3'

function App(){
  return(
    <div className="App">
     {/* <BrowserRouter>  */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="easy" element={<Easy />} />
        <Route path="hard" element={<Hard />} />
      </Routes>
      {/* </BrowserRouter>  */}
    </div>
    
);

}

export default App;
