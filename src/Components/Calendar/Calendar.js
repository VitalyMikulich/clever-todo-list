import moment from 'moment'
import React, { useEffect } from 'react'
import Day from '../Day/Day'
import PropTypes from 'prop-types'
import styles from './Calendar.module.css'

const daysConstructor = (todaysDate) => {
  const date = moment(todaysDate)
  const result = [date]
  for (let i = 0; i < 31; i++) {
    result.push(moment(date.add(1, 'd')))
  }
  return result;
}

const Calendar = ({ setCurrentDate, currentDate }) => {
  const todaysDate = moment()
  const dates = daysConstructor(todaysDate)
  
  useEffect(() => {
    setCurrentDate(todaysDate)
  }, [])

  return (
    <div className={ styles.daysContainer }>
      { dates.map((date, index) => {
        let activeClass = false
        if (typeof currentDate === 'object') {
          console.log(date.format() === currentDate.format())
          if (date.format('YYYY MM DD') === currentDate.format('YYYY MM DD')) {
            activeClass = true
          }
        }
        return <Day key={`key${index}`} date={ date } setCurrentDate={(date) => setCurrentDate(date) } activeClass={ activeClass } />
      }) }
    </div>
  )
}

Calendar.propTypes = {
  currentDate: PropTypes.object,
  setCurrentDate: PropTypes.func
}

export default Calendar
