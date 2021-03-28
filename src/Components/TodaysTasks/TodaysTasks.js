import React, {  useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import firebaseApp from '../../firebase'
import ToDo from '../ToDo/ToDo'
import styles from './TodaysTasks.module.css'
import { useStore } from 'react-redux'

const TodaysTasks = ({ currentDate }) => {
  const store = useStore()
  const { userID } = store.getState()
  const [taskCount, setTaskCount] = useState(null)
  const [currentTodos, setCurrentTodos] = useState(null)
  const getToDos = (user) => {
    if (currentDate) {
      return new Promise(() => {
                  let date
                  if (typeof currentDate === 'string') {
                    date = currentDate
                  } else {
                    date = currentDate.format('YYYY-MM-DD')
                  }
                  firebaseApp.database().ref(`${user}/${date}`)
                   .on('value', snapshot => {
                     const todos = snapshot.val()
                     if (todos !== null) {
                       const result = []
                       Object.keys(todos).forEach(key => {
                         const todo = todos[key]
                         result.push({...todo})
                       })
                       setTaskCount(result.length)
                       setCurrentTodos(result)
                     } else {
                      setTaskCount(null)
                      setCurrentTodos(null)
                     }
                    })
      })
    }
  }

  useEffect(() => {
    getToDos(userID)
  }, [currentDate, userID])

  return (
    <div className={ styles.TodaysTasks }>
      { taskCount ? <h2>{ taskCount } Task{taskCount > 1 ? 's' : ''} </h2> : null }
      { currentTodos ?  currentTodos.map((todo, index) => <ToDo  todo={ todo } key={ `${index}` } />) : null }
    </div>
  )
}

TodaysTasks.propTypes = {
  currentDate: PropTypes.object
}

export default TodaysTasks
