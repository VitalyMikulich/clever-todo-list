import styles from './NewTask.module.css'
import React, { useState } from 'react'
import firebaseApp from '../../firebase'

const saveTask = (event, date, title, description) => {
  event.preventDefault()
  return new Promise((resolve, reject) => {
    firebaseApp.database().ref('TjgVXxQJDgQPSqKszupsG5l4XKs2').push({
      date: date,
      title: title,
      description: description
    })
      .then(entry => {
      console.log(entry)
      resolve
      })
      .catch(error => reject(error))
  })

  

}

const NewTask = () => {
  const [inputTitle, setInputTitle] = useState('')
  const [inputDescription, setDescription] = useState('')

  
  return (
    <div className={ styles.newTaskContainer }>
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
          onClick={ (event) => saveTask(event, '2021-03-23', inputTitle, inputDescription) }
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default NewTask
