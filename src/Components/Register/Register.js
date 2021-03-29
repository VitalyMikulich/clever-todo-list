import React, { useState } from 'react'
import styles from './Register.module.css'
import firebaseApp from '../../firebase'
import ModalWindow from '../ModalWindow/ModalWindow'
import { setUserId } from '../../store/actions'
import { useStore } from 'react-redux'
import { Button, CircularProgress, makeStyles, Modal, TextField } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'

const useStyles = makeStyles({
  textField: {
    marginBottom: '10px',
  },
  button: {
    alignSelf: 'center',
    width: '200px',
  },
})

const Register = () => {
  const store = useStore()
  const classes = useStyles()
  const { activeTheme } = store.getState()
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [isOnline, setIsOnline] = useState(false)
  const [modal, setModal] = useState(false)
  const [errorText, setErrorText] = useState(null)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const register = (event, email, password) => {
    event.preventDefault()
    return new Promise((resolve, reject) => {
      setButtonDisabled(true)
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCreds) => {
          store.dispatch(setUserId(userCreds.user.uid))
          setIsOnline(true)
          resolve()
        })
        .catch((error) => {
          setErrorText(error.message)
          setModal(true)
          reject(error)
        })
        .finally(() => {
          setButtonDisabled(false)
        })
    })
  }

  const handleClose = () => {
    setModal(false)
  }

  return (
    <div className={ styles.RegisterContainer }>
      <div>Join Clever To-Do list</div>
      <form>
        <TextField
          size='small'
          classes={{ root: classes.textField }}
          variant='outlined'
          value={emailInput}
          label='Email'
          type='email'
          onChange={(event) => setEmailInput(event.target.value)}
        />
        <TextField
          size='small'
          classes={{ root: classes.textField }}
          variant='outlined'
          value={passwordInput}
          label='Password'
          type='password'
          onChange={(event) => setPasswordInput(event.target.value)}
        />
        <Button
          type='submit'
          variant='contained'
          onClick={(event) => register(event, emailInput, passwordInput)}
          classes={{ root: classes.button }}
          disabled={ buttonDisabled }
          color={ activeTheme === 'dark' ? 'primary' : 'default' }
        >
          { buttonDisabled ? <CircularProgress size={ 25 } /> : 'Sign Up' }
        </Button>
      </form>
      <div>
        Or{' '}
        <Link className={ `${styles.link} ${activeTheme === 'dark' ? styles.darkLink : ''}` } to='/signin'>
          Sign in with an existing account
        </Link>
      </div>
      { isOnline ? <Redirect to='/calendar' /> : null }
      <Modal open={ modal }>
        <ModalWindow errorText={ errorText } handleClose={ handleClose } />
      </Modal>
    </div>
  )
}

export default Register
