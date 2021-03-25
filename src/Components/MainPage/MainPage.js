import { Button } from '@material-ui/core'
import React, {  useState } from 'react'
// import { useStore } from 'react-redux'
import { Link } from 'react-router-dom'
import Calendar from '../Calendar/Calendar'
import Header from '../Header/Header'
import TodaysTasks from '../TodaysTasks/TodaysTasks'
import styles from './MainPage.module.css'

const MainPage = () => {
  // const store = useStore()
  // const { date } = store.getState()
  const [currentDate, setCurrentDate] = useState(null)

  return (
    <div className={ styles.mainPageContaier }>
      <Header />
      <Calendar setCurrentDate={ (date) => setCurrentDate(date) } />
      <TodaysTasks currentDate={ currentDate } />
      <Link className={ styles.link } to='/newtask'><Button variant="contained">Add a New Task</Button></Link>
    </div>
  )
}

export default MainPage
