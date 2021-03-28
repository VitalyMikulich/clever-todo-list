import React, { useEffect, useState } from 'react'
import MainPage from './Components/MainPage/MainPage'
import Authorization from './Components/Authorization/Authorization'
import Register from './Components/Register/Register'
import styles from './App.module.css'
import firebaseApp from './firebase'
import TaskContainer from './Components/TaskContainer/TaskContainer'
import Task from './Components/Task/Task'
import PrivateRouteOnline from './Components/PrivateRoute/PrivateRouteOnline'
import PrivateRouteOffline from './Components/PrivateRoute/PrivateRouteOffline'
import { useStore } from 'react-redux'
import { setUserId } from './store/actions'
import { Redirect, Route, Switch } from 'react-router-dom'

function App() {
  const [redirect, setRedirect] = useState(null)
  const store = useStore()
  const { userID } = store.getState()

  const authorization = () => {
    return new Promise((resolve, reject) => {
      firebaseApp.auth().onAuthStateChanged(user => {
        if (user) {
          store.dispatch(setUserId(user.uid))
          setRedirect(<Redirect to='/calendar' />)
          resolve()
        } else {
          setRedirect(<Redirect to='/signin' />)
          reject()
        }
      })
    })
  }

  useEffect(() => {
    authorization()
  }, [userID])


  return (
    <div className={styles.App}>
      <Switch>
        <PrivateRouteOffline path='/register' component={ Register } />
        <PrivateRouteOffline path='/signin' component={ Authorization } />
        <PrivateRouteOnline path='/calendar' component={ MainPage } />
        <Route path='/task/:id' render={(props) => <TaskContainer {...props} component={ Task } /> } />\
          { redirect || null }
      </Switch>
    </div>
  );
}

export default App;
