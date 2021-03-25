import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import styles from './Register.module.css'
import firebaseApp from '../../firebase';
import { setUserId } from '../../store/actions'
import { useStore } from 'react-redux';

const Register = () => {
  const store = useStore()
  console.log(store.getState())
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [isOnline, setIsOnline] = useState(false)

  const register = (event, email, password) => {
    event.preventDefault();
    return new Promise((resolve, reject) => {
      firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .then(userCreds => {
          console.log(userCreds)
          store.dispatch(setUserId(userCreds.user.uid))
          setIsOnline(true)
          resolve()
        })
        .catch(error => reject(error))
    })
  }

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
      { isOnline ? <Redirect to='/calendar' /> : null }
    </div>
  )
}

export default Register
