import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './ToDo.module.css'
import firebaseApp from '../../firebase'
import { useStore } from 'react-redux'

const ToDo = ({ todo }) => {
  const store = useStore();
  const { userID } = store.getState()
  const [checkboxValue, setCheckboxValue] = useState(todo.done)

  const updateDone = (event) => {
    return new Promise((resolve, reject) => {
      firebaseApp.database()
                 .ref(`${userID}/${todo.date}/${todo.key}`)
                 .set({
                   ...todo,
                   done: event.target.checked
                 })
                 .then(entry => {
                   console.log(entry)
                   console.log(event.target.checked)
                   resolve()
                 })
                 .catch(error => reject(error))
    })
  }
  return (
    <div className={ styles.ToDoConatiner }>
      <input
        type='checkbox'
        checked={ checkboxValue }
        onChange={(event) => {
          updateDone(event)
          console.log(event.target.checked)
          setCheckboxValue(event.target.checked)
        }}
      />
      <div>{ todo.title }</div>
    </div>
  )
}

ToDo.propTypes = {
  todo: PropTypes.object
}

export default ToDo
