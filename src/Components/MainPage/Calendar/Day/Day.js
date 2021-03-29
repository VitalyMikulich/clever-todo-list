import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Day.module.css'
import firebaseApp from '../../../../firebase'
import { useStore } from 'react-redux'
import { setDate } from '../../../../store/actions'

const Day = ({ date, setCurrentDate }) => {
  const store = useStore()
  const { userID, activeTheme } = store.getState()
  const [activeClass, setActiveClass] = useState('')
  const [isDoneToDos, setIsDoneToDos] = useState(false)
  const [isNotDoneToDos, setIsNotDoneToDos] = useState(false)

  const checkToDos = (toDos) => {
    if (toDos.some((toDo) => toDo.done === true)) {
      setIsDoneToDos(true)
    } else {
      setIsDoneToDos(false)
    }

    if (toDos.some((toDo) => toDo.done === false)) {
      setIsNotDoneToDos(true)
    } else {
      setIsNotDoneToDos(false)
    }
  }

  const getSnapshot = snapshot => {
    const todos = snapshot.val()
    if (todos !== null) {
      const result = []
      Object.keys(todos).forEach((key) => {
        const todo = todos[key]
        result.push({ ...todo })
      })
      if (result.length) {
        checkToDos(result)
      } else {
        setIsNotDoneToDos(false)
        setIsDoneToDos(false)
      }
    }
  }

  const getToDos = (user) => {
    if (date) {
      return new Promise(() => {
        firebaseApp
          .database()
          .ref(`${user}/${date.format('YYYY-MM-DD')}`)
          .on('value', getSnapshot)
      })
    }
  }

  const setActive = () => {
    store.dispatch(setDate(date.format('YYYY-MM-DD')))
    setCurrentDate(date)
  }

  useEffect(() => {
    if (date.format('YYYY-MM-DD') === store.getState().currentDate) {
      setActiveClass(styles.active)
    } else {
      setActiveClass('')
    }
  })

  useEffect(() => {
    if (userID) {
      getToDos(userID)
      // return unsubscribe(userID)
    }
  }, [userID])

  return (
    <div>
      <div
        className={ `${styles.dayContainer} ${ activeTheme === 'dark' ? styles.dark : '' } ${activeClass}` }
        onClick={() => {
          setActive()
        }}
      >
        <div>{date.format('ddd')}</div>
        <div>{date.format('MMM')}</div>
        <div>{date.format('Do')}</div>
      </div>
      <div className={ styles.toDosContainer }>
        { isNotDoneToDos ? (
          <div className={ `${styles.toDo} ${styles.notDoneToDo}` }></div>
        ) : null }
        {isDoneToDos ? (
          <div className={ `${styles.toDo} ${styles.doneToDo}` }></div>
        ) : null }
      </div>
    </div>
  )
}

Day.propTypes = {
  date: PropTypes.object,
  setCurrentDate: PropTypes.func,
}

export default Day
