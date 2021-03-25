import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import MainPage from './Components/MainPage/MainPage'
import Authorization from './Components/Authorization/Authorization'
import Register from './Components/Register/Register'
import styles from './App.module.css'
import NewTask from './Components/NewTask/NewTask'
import firebaseApp from './firebase'

import { useStore } from 'react-redux'
import { setUserId } from './store/actions'

function App() {
  const [isOnline, setIsOnline] = useState(null)
  const store = useStore()

  const authorization = () => {
    console.log(1)
    return new Promise((resolve, reject) => {
      firebaseApp.auth().onAuthStateChanged(user => {
        if (user) {
          setIsOnline(<Redirect to="/calendar" />)
          store.dispatch(setUserId(user.uid))
          resolve()
          console.log(user.uid)
        } else {
          setIsOnline(<Redirect to='/signin' />)
          reject()
        }
      })
    })
  }

  useEffect(() => {
    authorization()
  }, [store])


  return (
    <div className={styles.App}>
      <div>
        <Switch>

          <Route path="/signin" component={ Authorization } />
          <Route path="/register" component={ Register } />
          <Route path="/calendar" component={ MainPage } />
          <Route path="/task" component />
          <Route path="/newtask" component={ NewTask } />
          {/* <Redirect to='/signin' /> */}
          {/* <Route exact to='/'> */}
            { isOnline ? isOnline : null }
          {/* </Route> */}
        </Switch>
        {/* { authorization() } */}
      </div>
    </div>
  );
}

export default App;
