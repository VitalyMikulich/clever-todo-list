
import React, { useState } from 'react'
import firebaseApp from '../../firebase'
import styles from './Header.module.css'
import { setDate, setUserId } from '../../store/actions'
import { Button } from '@material-ui/core'
import { useStore } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Header = () => {
  const store = useStore()
  const [isOnline, setIsOnline] = useState(true)
  const signOut = () => {
    return new Promise((resolve, reject) => {
      firebaseApp
        .auth()
        .signOut()
        .then(() => {
          store.dispatch(setUserId(null))
          store.dispatch(setDate(null))
          setIsOnline(false)
          resolve()
        })
        .catch((error) => reject(error))
    })
  }

  return (
    <header className={styles.mainPage}>
      <h2>Tassker</h2>
      <div>
        <Button size="small" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
      {isOnline ? null : <Redirect to="/signin" />}
    </header>
  )
}

export default Header
