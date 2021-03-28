import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './ToDo.module.css'
import firebaseApp from '../../firebase'
import { useStore } from 'react-redux'
import { Checkbox } from '@material-ui/core'
import { CheckCircle, RadioButtonUnchecked } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const ToDo = ({ todo }) => {
  const store = useStore()
  const { userID } = store.getState()
  const [checkboxValue, setCheckboxValue] = useState(todo.done)
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
    <div className={ styles.ToDoContainer }>
      <Checkbox
        icon={ <RadioButtonUnchecked /> }
        checkedIcon={ <CheckCircle /> }
        checked={ checkboxValue }
        color="primary"
        onChange={(event) => {
          updateDone(event)
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
