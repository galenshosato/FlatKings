import './App.css';
import { useState, useEffect } from 'react'
import BetsList from './components/BetsList';
import Header from './components/Header';
import React from 'react';
import UserBetList from './components/UserBetList';


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
      <BetsList
      bets={bets}
      setBets={setBets} />
      <UserBetList />
    </div>

  )
}

export default App;
