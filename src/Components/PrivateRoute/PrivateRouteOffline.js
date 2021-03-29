import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import firebaseApp from '../../firebase'
import { Redirect, Route } from 'react-router-dom'
import { useStore } from 'react-redux'
import { CircularProgress } from '@material-ui/core'

const PrivateRoute = ({ component: Component, path }) => {
  const store = useStore()
  const [redirect, setRedirect] = useState(true)
  const { userID } = store.getState()
  const [status, setStatus] = useState(false)

  const authorization = () => {
    return new Promise(() => {
      firebaseApp.auth().onAuthStateChanged((user) => {
        if (!user) {
          setRedirect(true)
        } else {
          setRedirect(false)
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
      render={() => (redirect ? <Component /> : <Redirect to="/calendar" />)}
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
