import { Button } from '@material-ui/core'
import React, {  useState } from 'react'
import { Link } from 'react-router-dom'
import Calendar from '../Calendar/Calendar'
import TaskContainer from '../TaskContainer/TaskContainer'
import styles from './MainPage.module.css'

const MainPage = () => {
  const [currentDate, setCurrentDate] = useState('')

  return (
    <div className={ styles.mainPageContaier }>
      <header>
        <div>Tassker</div>
      </header>
      <Calendar setCurrentDate={ (date) => setCurrentDate(date) } currentDate={ currentDate } />
      <TaskContainer currentDate={ currentDate } />
      <Link className={ styles.link } to='/'><Button variant="contained">Add a New Task</Button></Link>
    </div>
  )
}

export default MainPage
