import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import MainPage from './Components/MainPage/MainPage'
import Authorization from './Components/Authorization/Authorization'
import TodaysTasks from './Components/TodaysTasks/TodaysTasks'
import Register from './Components/Register/Register'
import styles from './App.module.css'
import NewTask from './Components/NewTask/NewTask'

function App() {
  const authorization = () => {
    return <Redirect to="/register" />
  }
  return (
    <div className={styles.App}>
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/signin" component={ Authorization } />
            <Route path="/calendar" component={ MainPage } />
            <Route path="/tasks" component={ TodaysTasks } />
            <Route path="/register" component={ Register } />
            <Route path="/newtask" component={ NewTask } />
          </Switch>
          { authorization() }
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
