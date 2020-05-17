import React, { useState } from 'react';
import './App.css';
import Canvas from './components/Canvas'
import { Button } from '@material-ui/core';
import Axios from 'axios';

function App() {

  const [bobaParams, setBobaParams] = useState({
    sizeMultiplier: Math.random() * (2.2 - 1.6) + 1.6,
    height: 150,
    angleMultiplier: .15
  });

  const params = {
    sizeMultiplier: 2,
    height: 150,
    angleMultiplier: .2
  }

  const login = () => {
    Axios.get('http://localhost:5000/auth/facebook')
  }
  

  return (
    <div className="App">
      <Canvas setBobaParams={setBobaParams} bobaParams={bobaParams}/>
      <Button variant="contained" color="primary" onClick={()=>setBobaParams({
        sizeMultiplier: Math.random() * (2.2 - 1.6) + 1.6,
        height: 150,
        angleMultiplier: .15
      })}>ChangeMe</Button>
      <Button variant="contained" color="primary" href='http://localhost:5000/auth/facebook'>Login</Button>
      <Button variant="contained" color="primary" href='http://localhost:5000/logout'>Logout</Button>
    </div>
  );
}

export default App;
