import styles from './NewTask.module.css'
import React, { useState } from 'react'
import firebaseApp from '../../firebase'
import { Link, Redirect } from 'react-router-dom'
import { useStore } from 'react-redux'
import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { ArrowBackIos } from '@material-ui/icons'

const useStyles = makeStyles({
  textField: {
    marginBottom: '10px',
  },
  button: {
    alignSelf: 'center',
    width: '30%',
  },
})

const NewTask = () => {
  const store = useStore()
  const classes = useStyles()
  const { userID, currentDate } = store.getState()
  const [inputTitle, setInputTitle] = useState('')
  const [inputDescription, setDescription] = useState('')
  const [redirect, setRedirect] = useState(false)

  const saveTask = (event, date, title, description) => {
    event.preventDefault()
    return new Promise((resolve, reject) => {
      const key = firebaseApp.database().ref(`${ userID }/${ date }`).push().key
      firebaseApp
        .database()
        .ref(`${ userID }/${ date }/${ key }`)
        .set({
          done: false,
          title,
          description,
          key,
          date,
        })
        .then(() => {
          setRedirect(true)
          resolve()
        })
        .catch((error) => reject(error))
    })
  }

  return (
    <div className={styles.newTaskContainer}>
      <header>
        <Link className={styles.link} to="/calendar">
          <Button startIcon={ <ArrowBackIos /> }>Back</Button>
        </Link>
      </header>
      <form>
        <TextField
          value={inputTitle}
          classes={{ root: classes.textField }}
          type="text"
          label="Title"
          variant="outlined"
          onChange={(event) => setInputTitle(event.target.value)}
        />
        <TextField
          multiline
          label="Description"
          variant="outlined"
          rows={10}
          rowsMax={50}
          value={inputDescription}
          classes={{ root: classes.textField }}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Button
          type="submit"
          classes={{ root: classes.button }}
          color="primary"
          variant="contained"
          onClick={(event) =>
            saveTask(event, currentDate, inputTitle, inputDescription)
          }
        >
          Save
        </Button>
        { redirect ? <Redirect to="/calendar" /> : null }
      </form>
    </div>
  )
}

export default NewTask
