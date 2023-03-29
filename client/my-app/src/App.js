import './App.css';
import React, { Fragment } from 'react';
import { useState, useEffect } from 'react'
import BetsList from './components/BetsList';
import Header from './components/Header';
import UserBetList from './components/UserBetList';

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
                setBets={setBets}/>} path="/" />
      <UserBetList />
      </Routes>
    </div>

  )
}

export default App;
