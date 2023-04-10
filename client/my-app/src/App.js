import './App.css';
import React from 'react';
import { useFormik } from "formik";
import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";

//import child components
import BetsList from './components/BetsList';
import SignInForm from './components/SignInForm';
import Header from './components/Header';
import UserBetList from './components/UserBetList';
import Login from './components/Login';


function App() {
  const [bets, setBets] = useState([])
  const [user, setUser] = useState({})
  const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/games")
        .then((response) => response.json())
        .then(setBets)
    }, []);


    useEffect(()=>{
      fetch("/check_session").then((response) => {
        if (response.ok) {
          response.json().then((user) => setUser(user));
        }
      });
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
          .then(data => console.log(data))

          .then(() => navigate('/login'))

      }
  })

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
    .then(() => navigate('/user'))
  }



    //Logout

    function handleLogOut(){
      setUser({})
    }



  return (
    <div className='app'>
      <Header userStatus={user} onLogout ={handleLogOut} />
      <Routes>
            <Route element={
                <BetsList
                bets={bets}
                setBets={setBets}/>} exact path="/" />

            <Route element={
                <UserBetList bets={bets} user={user} />} path="/user" />

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
