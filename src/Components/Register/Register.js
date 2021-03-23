import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Register.module.css'
import firebaseApp from '../../firebase';

const register = (event, email, password) => {
  event.preventDefault();
  return new Promise((resolve, reject) => {
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .then(user => { 
        console.log(user)
        resolve()
      })
      .catch(error => reject(error))
  })
}

const Register = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  return (
    <div className={ styles.RegisterContainer }>
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
          onClick={ (event) => register(event, emailInput, passwordInput) }
        >
          Sign Up
        </button>
      </form>
      <Link to="/signin">Sign In</Link>
    </div>
  )
}

export default Register
