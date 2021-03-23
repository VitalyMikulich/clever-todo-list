import React from 'react'
import PropTypes from 'prop-types'
import styles from './Day.module.css'

const Day = ({ date, setCurrentDate }) => {

  return (
    <div className={ styles.dayContainer } onClick={() => setCurrentDate(date)}>
      <div>{ date.format('ddd') }</div>
      <div>{ date.format('MMM') }</div>
      <div>{ date.format('Do') }</div>
    </div>
  )
}

Day.propTypes = {
  date: PropTypes.object,
  setCurrentDate: PropTypes.func
}

export default Day
