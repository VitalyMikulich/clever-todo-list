import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useStore } from 'react-redux'
import { Redirect } from 'react-router-dom'
import firebaseApp from '../../firebase'
import { setUserId } from '../../store/actions'
import './Header.module.css'


const Header = () => {
  const store = useStore()
  console.log(store.getState())
  const [isOnline, setIsOnline] = useState(true)
  const signOut = () => {
    return new Promise((resolve, reject) => {
      firebaseApp.auth()
                 .signOut()
                 .then(() => {
                  store.dispatch(setUserId(null))
                  setIsOnline(false)
                  resolve()
                 })
                 .catch(error => reject(error))
    })
  }

  return (
    <header>
      <div>Tassker</div>
      <div><Button size='small' onClick={ () => signOut() }>Sign Out</Button></div>
      { isOnline ? null : <Redirect to='/signin' /> }
    </header>
  )
}

export default Header
