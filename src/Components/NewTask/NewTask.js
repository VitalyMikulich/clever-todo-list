import styles from './NewTask.module.css'
import React, { useState } from 'react'
import firebaseApp from '../../firebase'
import { Link, Redirect } from 'react-router-dom'
import { useStore } from 'react-redux'



const NewTask = () => {
  const store = useStore()
  const { userID, currentDate } = store.getState()
  console.log(userID, currentDate)
  const [inputTitle, setInputTitle] = useState('')
  const [inputDescription, setDescription] = useState('')
  const [redirect, setRedirect] = useState(false)

  const saveTask = (event, date, title, description) => {
    event.preventDefault()
    // return new Promise((resolve, reject) => {
    //   firebaseApp.database().ref(userID).child(date).push({
    //     title: title,
    //     description: description,
    //     done: false
    //   })
    //     .then(entry => {
    //       console.log(entry)
    //       setRedirect(true)
    //       resolve()
    //     })
    //     .catch(error => reject(error))
    // })
    return new Promise((resolve, reject) => {
      const key = firebaseApp.database().ref(`${userID}/${date}`).push().key
      firebaseApp.database()
                 .ref(`${userID}/${date}/${key}`)
                 .set({
                   done: false,
                   title,
                   description,
                   key,
                   date
                 })
                 .then(entry => {
                   console.log(entry)
                   setRedirect(true)
                   resolve()
                 })
                 .catch(error => reject(error))
    })
  }
  
  return (
    <div className={ styles.newTaskContainer }>
      <Link to='/calendar'>
        Back
      </Link>
      <form>
        <input
          value={ inputTitle }
          type='text'
          placeholder='title'
          onChange={ (event) => setInputTitle(event.target.value) }
        />
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          value={ inputDescription }
          onChange={ (event) => setDescription(event.target.value) }
        />
        <button
          type="submit"
          onClick={ (event) => saveTask(event, currentDate, inputTitle, inputDescription) }
        >
          Save
        </button>
        { redirect ? <Redirect to='/calendar' /> : null }
      </form>
    </div>
  )
}

export default NewTask
