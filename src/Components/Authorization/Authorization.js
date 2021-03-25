import React from 'react'
import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import styles from './Authorization.module.css'
import firebaseApp from '../../firebase'
import { setUserId } from '../../store/actions'
// import PropTypes from 'prop-types'
import { connect, useStore } from 'react-redux'

const Authorization = () => {
  const store = useStore()
  console.log(store.getState())
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('')
  const [isOnline, setIsOnline] = useState(false)

  const signin = (event, email, password) => {
    event.preventDefault();
    return new Promise((resolve, reject) => {
      firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .then(userCreds => {
          console.log(userCreds)
          store.dispatch(setUserId(userCreds.user.uid))
          setIsOnline(true)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }

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
      { isOnline ? <Redirect to='/calendar' /> : null }
    </div>
  )
}

// Authorization.propTypes = {
  // store: PropTypes.object
// }

export default connect()(Authorization)
