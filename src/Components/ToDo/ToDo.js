import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './ToDo.module.css'
import firebaseApp from '../../firebase'
import { useStore } from 'react-redux'
import { Checkbox } from '@material-ui/core'
import { CheckCircle, RadioButtonUnchecked } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const ToDo = ({ todo }) => {
  console.log(todo.done, '1', todo.title)
  const store = useStore()
  const { userID } = store.getState()
  const [checkboxValue, setCheckboxValue] = useState(todo.done)
  console.log(checkboxValue, '2', todo.title)
  useEffect(() => {
    setCheckboxValue(todo.done)
  })

  const updateDone = (event) => {
    return new Promise(() => {
      firebaseApp
        .database()
        .ref(`${ userID }/${ todo.date }/${ todo.key }`)
        .set({
          ...todo,
          done: event.target.checked,
        })
    })
  }

  return (
    <div className={ styles.ToDoConatiner }>
      <Checkbox
        icon={ <RadioButtonUnchecked /> }
        checkedIcon={ <CheckCircle /> }
        checked={ checkboxValue }
        color="primary"
        onChange={(event) => {
          updateDone(event)
          console.log(event.target.checked, todo.title)
          if (checkboxValue) {
            setCheckboxValue(false)
          } else {
            setCheckboxValue(true)
          }
        }}
      />
      <Link
        to={{
          pathname: `/task/${ todo.key }`,
          props: {
            // userID,
            // key: todo.key,
            // date: todo.date,
            // done: todo.done
            todo,
          },
        }}
        className={ styles.link }
      >
        <div>{ todo.title }</div>
      </Link>
    </div>
  )
}

ToDo.propTypes = {
  todo: PropTypes.object,
}

export default ToDo
