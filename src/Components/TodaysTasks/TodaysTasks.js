import React, { useEffect, useState } from 'react'
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
      return new Promise((resolve, reject) => {
        firebaseApp.database().ref(`${user}/${currentDate.format('YYYY-MM-DD')}`)
                   .once('value')
                   .then(snapshot => {
                     const todos = snapshot.val()
                     if (todos !== null) {
                       const result = []
                       Object.keys(todos).forEach(key => {
                         const todo = todos[key]
                         result.push({...todo})
                       })
                       if (result.length) {
                         setTaskCount(result.length)
                         setCurrentTodos(result)
                       }  else {
                         setTaskCount(null)
                         setCurrentTodos(null)
                       }
                     }
                     resolve()
                    })
                   .catch(error => reject(error))
      })
    }
  }

  useEffect(() => {
    getToDos(userID)
  }, [currentDate])

  return (
    <div className={ styles.TodaysTasks }>
      { taskCount ? <div>{ taskCount } Task Today</div> : null }
      { currentDate ? <div>{ currentDate.format('YYYY-MM-DD') }</div> : null }
      { currentTodos ?  currentTodos.map((todo, index) => <ToDo  todo={todo} key={`currentTodo${index}`} />) : null }
    </div>
  )
}

TodaysTasks.propTypes = {
  currentDate: PropTypes.object
}

export default TodaysTasks
