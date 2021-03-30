import React, { useState } from 'react'
import Calendar from './Calendar/Calendar'
import Header from './Header/Header'
import TodaysTasks from './TodaysTasks/TodaysTasks'
import styles from './MainPage.module.css'
import { Button, makeStyles } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useStore } from 'react-redux'

const useStyles = makeStyles({
  button: {
    alignSelf: 'center',
  },
})

const MainPage = () => {
  const store = useStore()
  const { currentDate: date } = store.getState()
  const [currentDate, setCurrentDate] = useState(null || date)
  const classes = useStyles()

  return (
    <div className={ styles.mainPageContaier }>
      <div>
        <Header />
        <Calendar setCurrentDate={(date) => setCurrentDate(date)} />
        <TodaysTasks currentDate={ currentDate } />
      </div>
      <Link
        className={ styles.link }
        to={{
          pathname: '/task/new',
          props: {
            newtask: 'newtask',
          },
        }}
      >
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
