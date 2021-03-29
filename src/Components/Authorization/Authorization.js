import React, { useState } from 'react'
import styles from './Authorization.module.css'
import firebaseApp from '../../firebase'
import ModalWindow from '../ModalWindow/ModalWindow'
import { Link, Redirect } from 'react-router-dom'
import { setUserId } from '../../store/actions'
import { useStore } from 'react-redux'
import { Button, CircularProgress, makeStyles, Modal, TextField } from '@material-ui/core'

const useStyles = makeStyles({
  textField: {
    marginBottom: '10px',
    color: 'white'
  },
  button: {
    alignSelf: 'center',
    width: '200px',
  },
})

const Authorization = () => {
  const store = useStore()
  const { activeTheme } = store.getState()
  const classes = useStyles()
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [isOnline, setIsOnline] = useState(false)
  const [modal, setModal] = useState(false)
  const [errorText, setErrorText] = useState(null)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const signin = (event, email, password) => {
    event.preventDefault()
    return new Promise((resolve, reject) => {
      setButtonDisabled(true)
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCreds) => {
          store.dispatch(setUserId(userCreds.user.uid))
          setIsOnline(true)
          resolve()
        })
        .catch((error) => {
          setErrorText(error.message)
          setModal(true)
          reject()
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
    <div className={ styles.AuthorizationContainer }>
      { isOnline ? <Redirect to='/calendar' /> : null }
      <div>Sign In To Clever To-Do list</div>
      <form>
        <TextField
          size='small'
          classes={{ root: classes.textField }}
          variant='outlined'
          value={emailInput}
          label='Email'
          type='email'
          onChange={ (event) => setEmailInput(event.target.value) }
        />
        <TextField
          size='small'
          classes={{ root: classes.textField }}
          variant='outlined'
          value={passwordInput}
          label='Password'
          type='password'
          onChange={ (event) => setPasswordInput(event.target.value) }
        />
        <Button
          type='submit'
          variant='contained'
          onClick={ (event) => signin(event, emailInput, passwordInput) }
          classes={{ root: classes.button }}
          disabled={ buttonDisabled }
          color={ activeTheme === 'dark' ? 'primary' : 'default' }
        >
          { buttonDisabled ? <CircularProgress size={ 25 } /> : 'Sign In' }
        </Button>
      </form>
      <div>
        Or{' '}
        <Link className={ `${styles.link} ${activeTheme === 'dark' ? styles.darkLink : ''}` } to='/register'>
          Create an account
        </Link>
      </div>
      <Modal open={ modal }>
        <ModalWindow errorText={ errorText } handleClose={ handleClose } />
      </Modal>
    </div>
  )
}

export default Authorization
