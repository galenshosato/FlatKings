import './App.css';
import React from 'react';
import { useFormik } from "formik";
import { useState, useEffect } from 'react'
import BetsList from './components/BetsList';
import SignInForm from './components/SignInForm';
import Header from './components/Header';
import UserBetList from './components/UserBetList';

import { Route, Routes, useNavigate } from "react-router-dom";
import Login from './components/Login';

function App() {
  const [bets, setBets] = useState([])
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
        fetch("https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=e6b468f4ded18c9930ffb6dd119aef7f&regions=us&markets=h2h,spreads&oddsFormat=american&bookmakers=draftkings")
        .then((response) => response.json())
        .then(setBets)
    }, []);



  const formik = useFormik({
      initialValues: {
          email: "",
          password: "",
      },
      onSubmit: (values) => {
          fetch('/user_info', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(values, null, 2)
          })
          .then(() => navigate('/user'))
      }
  })

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);


  function handleLoginSubmit(event) {
    // Prevent page refresh
    event.preventDefault()

    // Get data from form
    const data = {
      email: event.target.email.value,
      password: event.target.password.value
    }

    // Send data to flask
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(data => setUser(data))
    .then(() => navigate('/'))
  }

  


  

  return (
    <div className='app'>
      <Header userStatus={user} />
      <Routes>
            <Route element={
                <BetsList
                bets={bets}
                setBets={setBets} user={user}/>} exact path="/" />
                
            <Route element={
                <UserBetList />}  path='/user/:id' />

            <Route element={
                <SignInForm
                formik={formik}
                />} path="/signin"/>

            <Route element={
              <Login
                handleSubmit={handleLoginSubmit}
              />} path="/login"/>
            
      </Routes>
    </div>
  )
}

export default App;
