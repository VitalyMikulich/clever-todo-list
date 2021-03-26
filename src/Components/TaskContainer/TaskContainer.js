/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './TaskContainer.module.css'
import { Link, Redirect } from 'react-router-dom'
import { ArrowBackIos, CheckCircle, RadioButtonUnchecked } from '@material-ui/icons';
import { Button, Checkbox } from '@material-ui/core';

const TaskContainer = ({ location }) => {
  const [checkboxValue, setCheckboxValue] = useState()

  return (
    <div className={ styles.TaskContainer }>
      { !location ? <Redirect to='/calendar' /> : null }
      <header>
        <Link className={ styles.link } to='/calendar'>
          <Button startIcon={ <ArrowBackIos /> }>
            Back
          </Button>
        </Link>
      </header>
      <div className={ styles.ToDoConatiner }>
        {/* <Checkbox
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
        <div>{ todo.title }</div> */}
      </div>
    </div>
  )
}

TaskContainer.propTypes = {
  location: PropTypes.object
}

export default TaskContainer
