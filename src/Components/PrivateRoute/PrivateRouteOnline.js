import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import firebaseApp from '../../firebase'
import { Redirect, Route } from 'react-router-dom'
import { useStore } from 'react-redux'
import { setUserId } from '../../store/actions'
import { CircularProgress } from '@material-ui/core'

const PrivateRoute = ({ component: Component, path }) => {
  const store = useStore()
  const [redirect, setRedirect] = useState(true)
  const { userID } = store.getState()
  const [status, setStatus] = useState(false)

  const authorization = () => {
    return new Promise((resolve, reject) => {
      firebaseApp.auth().onAuthStateChanged((user) => {
        if (user) {
          store.dispatch(setUserId(user.uid))
          setRedirect(true)
          resolve()
        } else {
          setRedirect(false)
          reject()
        }
      })
    })
  }

  useEffect(() => {
    authorization().finally(() => setStatus(true))
  }, [userID])

  return status ? (
    <Route
      path={ path }
      render={() => (redirect ? <Component /> : <Redirect to="/signin" />)}
    />
  ) : (
    <div><CircularProgress size={ 80 } /></div>
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  path: PropTypes.string,
}

export default PrivateRoute
