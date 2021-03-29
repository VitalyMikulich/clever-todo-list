import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Task.module.css'
import firebaseApp from '../../firebase'
import { Link, Redirect } from 'react-router-dom'
import {
  ArrowBackIos,
  CheckCircle,
  DeleteOutline,
  DoneOutlined,
  EditOutlined,
  RadioButtonUnchecked,
} from '@material-ui/icons'
import { Button, Checkbox, makeStyles, TextField } from '@material-ui/core'
import { useStore } from 'react-redux'

const useStyles = makeStyles({
  completeButton: {
    backgroundColor: '#baffba',
    color: 'green',
    '&:hover': {
      backgroundColor: '#baffba',
    }
  },
  textField: {
    marginBottom: '10px',
  },
})


const Task = ({ locProps }) => {
  const store = useStore()
  const { userID, currentDate } = store.getState()
  const classes = useStyles()
  let { todo } = locProps
  let date = currentDate, value = false, title = '', description = '', editWindow = true, key = null

  if (todo) {
    date = todo.date
    value = todo.done
    title = todo.title
    description = todo.description
    editWindow = false
    key = todo.key
  }

  const [checkboxValue, setCheckboxValue] = useState(value)
  const [edit, setEdit ] = useState(editWindow)
  const [redirectToMain, setRedirectToMain] = useState(false)
  const [inputTitle, setInputTitle] = useState(title)
  const [inputDescription, setInputDescription] = useState(description)
  const [newKey, setNewKey] = useState(key)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const saveTask = (event, date, title, description) => {
    event.preventDefault()
    return new Promise((resolve, reject) => {
      const currentKey = newKey || firebaseApp.database().ref(`${ userID }/${ date }`).push().key
      firebaseApp
        .database()
        .ref(`${ userID }/${ date }/${ currentKey }`)
        .set({
          done: checkboxValue,
          key: currentKey,
          title,
          description,
          date,
        })
        .then(() => {
          resolve()
        })
        .catch((error) => reject(error))
        .finally(() => {
          setButtonDisabled(false)
        })
        setNewKey(currentKey)
    })
  }

  const updateDone = (event, date, title, description) => {
    return new Promise(() => {
      firebaseApp
        .database()
        .ref(`${ userID }/${ date }/${ newKey }`)
        .set({
          done: event.target.checked,
          key: newKey,
          title,
          description,
          date,
        })
    })
  }

  const removeTodo = (user, date, key) => {
    return new Promise(() => {
      firebaseApp
        .database()
        .ref(`${user}/${date}/${key}`)
        .remove()
        .then(() => {
          setRedirectToMain(true)
        })
    })
  }

  return (
    <div className={ styles.Task }>
      <div>
        <header>
          <Link className={ styles.link } to='/calendar'>
            <Button startIcon={ <ArrowBackIos /> }>Back</Button>
          </Link>
        </header>
        { edit ? ( 
          <form>
            <TextField
              value={ inputTitle }
              classes={{ root: classes.textField }}
              type='text'
              label='Title'
              variant='outlined'
              inputProps={{ maxLength: 100 }}
              onChange={(event) => setInputTitle(event.target.value)}
            />
            <div className={ styles.countOfWords }>{ inputTitle.length }/100</div>
            <TextField
              multiline
              label='Description'
              variant='outlined'
              rows={ 10 }
              rowsMax={ 20 }
              value={ inputDescription }
              classes={{ root: classes.textField }}
              inputProps={{ maxLength: 2000}}
              onChange={(event) => setInputDescription(event.target.value)}
            />
            <div className={ styles.countOfWords }>{ inputDescription.length }/2000</div>
        </form>
        ) : (
          <>
            <div className={ styles.ToDoContainer }>
              <Checkbox
                icon={ <RadioButtonUnchecked /> }
                checkedIcon={ <CheckCircle /> }
                checked={checkboxValue}
                color='primary'
                onChange={(event) => {
                  updateDone(event, date, inputTitle, inputDescription)
                  if (checkboxValue) {
                    setCheckboxValue(false)
                  } else {
                    setCheckboxValue(true)
                  }
                }}
              />
              <div>{ inputTitle }</div>
            </div>
            <p>{ inputDescription }</p>
          </>
            ) }
          </div>
          <div className={ styles.buttonsContainer }>
            { edit ? (
              <Button
                variant='contained'
                endIcon={ <DoneOutlined /> }
                classes={{ root: classes.completeButton }}
                onClick={(event) => {
                  saveTask(event, date, inputTitle, inputDescription)
                  { locProps.newtask ? setRedirectToMain(true) : setEdit(false) }
                }}
                disabled={ buttonDisabled }
              >
                { locProps.newtask ? 'Save' : 'Update'}
              </Button>
             ) : (
              <div>
                <Button onClick={() => removeTodo(userID, date, newKey) }>
                  <DeleteOutline />
                </Button>
                <Button onClick={() => setEdit(true)}>
                  <EditOutlined />
                </Button>
              </div>
             )}
      </div>
      { redirectToMain ? <Redirect to='/calendar' /> : null }
    </div>
  )
}

Task.propTypes = {
  locProps: PropTypes.object
}

export default Task
