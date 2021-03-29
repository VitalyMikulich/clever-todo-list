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
import { setTheme, setUserId } from './store/actions'
import { Redirect, Route, Switch } from 'react-router-dom'

function App() {
  const store = useStore()
  const { userID, activeTheme } = store.getState()
  const [redirect, setRedirect] = useState(null)

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
    store.dispatch(setTheme('light')) // write 'dark' for dark theme; 'light' - for default
    authorization()
  }, [userID])

  useEffect(() => {
    if (activeTheme === 'dark') {
      document.body.classList.add('darkBody')
    } else {
      document.body.classList.remove('darkBody')
    }
  })


  return (
    <div className={ `${ styles.App } ${ activeTheme === 'dark' ? styles.dark : '' }`}>
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
