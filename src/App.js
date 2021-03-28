import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import MainPage from './Components/MainPage/MainPage'
import Authorization from './Components/Authorization/Authorization'
import Register from './Components/Register/Register'
import styles from './App.module.css'
import firebaseApp from './firebase'
import TaskContainer from './Components/TaskContainer/TaskContainer'
import { useStore } from 'react-redux'
import { setUserId } from './store/actions'
import Task from './Components/Task/Task'

import PrivateRoute from './Components/PrivateRoute/PrivateRoute'

function App() {
  const [isOnline, setIsOnline] = useState(null)
  const store = useStore()
  const { userID } = store.getState()

  const authorization = () => {
    return new Promise((resolve, reject) => {
      firebaseApp.auth().onAuthStateChanged(user => {
        if (user) {
          store.dispatch(setUserId(user.uid))
          setIsOnline(<Redirect to="/calendar" />)
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
    <div className={styles.App} onLoad={ () => authorization() }>
      <Switch>
        <Route path="/signin" component={ Authorization } />
        <Route path="/register" component={ Register } />
        <PrivateRoute path='/calendar' component={ MainPage } />
        <Route path="/task/:id" render={(props) => <TaskContainer {...props} component={ Task } /> } />\
          { isOnline || null }
      </Switch>
    </div>
  );
}

export default App;
