import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Authorization.module.css'
import firebaseApp from '../../firebase'

const signin = (event, email, password) => {
  event.preventDefault();
  return new Promise((resolve, reject) => {
    // firebaseApp.auth().onAuthStateChanged((user) => {
    //   if(user) {
    //     console.log(user)
    //     resolve()
    //   } else {
    //     reject(new Error(`user doesn't exit` ))
    //   }
    // })
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user)
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}

const Authorization = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  return (
    <div className={ styles.AuthorizationContainer }>
      <form>
        <input
          value={ emailInput }
          placeholder="Email"
          required
          type="email" 
          onChange={ (event) => setEmailInput(event.target.value) }
        />
        <input
          value={ passwordInput }
          placeholder="Password"
          required
          type="password"
          onChange={ (event) => setPasswordInput(event.target.value) }
        />
        <button
          type="submit"
          onClick={(event) => signin(event, emailInput, passwordInput)}
        >
          Sign In
        </button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  )
}

export default Authorization
