import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { useStore } from 'react-redux'
import firebaseApp from '../../firebase'
import { setUserId } from '../../store/actions'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const store = useStore()
  const [isOnline, setIsOnline] = useState(null)
  const { userID } = store.getState()

  const authorization = () => {
    return new Promise((resolve, reject) => {
      firebaseApp.auth().onAuthStateChanged(user => {
        if (user) {
          store.dispatch(setUserId(user.uid))
          setIsOnline(<Component {...rest} />)
          resolve()
        } else {
          setIsOnline(<Redirect to='/signin' />)
          reject()
        }
      })
    })
  }

  useEffect(() => {
    authorization()
  }, [userID])

  return (
    <>
      { isOnline || null }
    </>
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.any,
}

export default PrivateRoute
