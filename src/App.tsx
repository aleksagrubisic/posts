import React from 'react'
import './App.css';
import ApplicationContext from './context/ApplicationContext';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Error from './pages/Error/Error'

function App() {
  return (
    <ApplicationContext>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='*' element={<Error />}/>
      </Routes>
    </ApplicationContext>
  );
}

export default App;
