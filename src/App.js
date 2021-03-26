import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import MainPage from './Components/MainPage/MainPage'
import Authorization from './Components/Authorization/Authorization'
import Register from './Components/Register/Register'
import styles from './App.module.css'
import NewTask from './Components/NewTask/NewTask'
import firebaseApp from './firebase'
import TaskContainer from './Components/TaskContainer/TaskContainer'
import { useStore } from 'react-redux'
import { setUserId } from './store/actions'

// import PrivateRoute from './Components/PrivateRoute/PrivateRoute'

function App() {
  const [isOnline, setIsOnline] = useState(null)
  // const [user, setUser] = useState(null)
  const store = useStore()

  const authorization = () => {
    console.log(1)
    // return new Promise((resolve, reject) => {
      firebaseApp.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user.uid)
          store.dispatch(setUserId(user.uid))
          // setUser(user)
          console.log(store.getState())
          setIsOnline(<Redirect to="/calendar" />)
          // resolve()
        } else {
          setIsOnline(<Redirect to='/signin' />)
          // reject()
        }
      })
    // })
  }

  useEffect(() => {
    authorization()
  }, [store])


  return (
    <div className={styles.App} onLoad={ () => authorization() }>
      <Switch>
        <Route path="/signin" component={ Authorization } />
        <Route path="/register" component={ Register } />
        {/* <PrivateRoute path='/calendar' component={ MainPage } /> */}
        <Route path="/calendar" component={ MainPage } />
        <Route path="/newtask" component={ NewTask } />
        <Route path="/task/:id" component={ TaskContainer } />
          { isOnline ? isOnline : null }
      </Switch>
    </div>
  );
}

export default App;
