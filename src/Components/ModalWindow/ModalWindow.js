import React from 'react'
import PropTypes from 'prop-types'
import styles from './ModalWindow.module.css'
import { Button } from '@material-ui/core'

const ModalWindow = ({ errorText, handleClose }) => {
  return (
    <div className={ styles.modal }>
      <h2>{ errorText }</h2>
      <Button onClick={ handleClose }>Close</Button>
    </div>
  )
}

ModalWindow.propTypes = {
  errorText: PropTypes.string,
  handleClose: PropTypes.func
}

export default ModalWindow
