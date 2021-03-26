import React, { useState } from 'react'
import Calendar from '../Calendar/Calendar'
import Header from '../Header/Header'
import TodaysTasks from '../TodaysTasks/TodaysTasks'
import styles from './MainPage.module.css'
import { Button, makeStyles } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  button: {
    alignSelf: 'center',
  },
})

const MainPage = () => {
  const [currentDate, setCurrentDate] = useState(null)
  const classes = useStyles()

  return (
    <div className={styles.mainPageContaier}>
      <Header />
      <Calendar setCurrentDate={ (date) => setCurrentDate(date) } />
      <TodaysTasks currentDate={ currentDate } />
      <Link className={ styles.link } to="/newtask">
        <Button
          classes={{ root: classes.button }}
          color="primary"
          variant="contained"
          startIcon={ <Add /> }
        >
          Add a New Task
        </Button>
      </Link>
    </div>
  )
}

export default MainPage
