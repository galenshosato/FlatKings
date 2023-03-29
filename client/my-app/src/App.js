import './App.css';
import React, { Fragment } from 'react';
import { useState, useEffect } from 'react'
import BetsList from './components/BetsList';
import SignInForm from './components/SignInForm';
import Header from './components/Header';
import { Route, Routes } from "react-router-dom";

function App() {
  const [bets, setBets] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/games")
        .then((response) => response.json())
        .then(setBets)
    }, []);

  return (
    <div className='app'>
      <Header />
      <Routes>
            <Route element={
                <BetsList
                bets={bets}
                setBets={setBets}/>} exact path="/" />

            <Route element={
              <SignInForm/>} path="/signin"/>
      </Routes>
    </div>
  )
}

export default App;
