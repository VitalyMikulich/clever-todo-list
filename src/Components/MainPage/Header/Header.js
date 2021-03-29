import React, { useState } from 'react'
import firebaseApp from '../../../firebase'
import styles from './Header.module.css'
import { setDate, setUserId } from '../../../store/actions'
import { Button, makeStyles } from '@material-ui/core'
import { useStore } from 'react-redux'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles({
  buttonDark: {
    color: '#e3e3e3',
  }
})

const Header = () => {
  const store = useStore()
  const { activeTheme } = store.getState()
  const [isOnline, setIsOnline] = useState(true)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const classes = useStyles()
  const buttonStyle = activeTheme === 'dark' ? classes.buttonDark : ''

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
        .finally(() => {
          setButtonDisabled(false)
        })
    })
  }

  return (
    <header className={ styles.mainPage }>
      <h2>Tassker</h2>
      <div>
        <Button
          size='small'
          onClick={() => signOut()}
          disabled={ buttonDisabled }
          classes={{ root: buttonStyle }}
        >
          Sign Out
        </Button>
      </div>
      {isOnline ? null : <Redirect to='/signin' />}
    </header>
  )
}

export default Header
