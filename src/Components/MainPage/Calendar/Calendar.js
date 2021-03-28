import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Day from './Day/Day'
import PropTypes from 'prop-types'
import styles from './Calendar.module.css'
import { useStore } from 'react-redux'
import { setDate } from '../../../store/actions'

const daysConstructor = (lastDay) => {
  const day = moment(lastDay)
  const days = [moment(day)]
  for (let i = 0; i < 30; i++) {
    days.push(moment(day.add(1, 'd')))
  }
  return {
    lastDay: moment(moment(days[30]).add(1, 'd')),
    days,
  }
}

const Calendar = ({ setCurrentDate }) => {
  const store = useStore()
  const day = moment()
  const [days, setDays] = useState(daysConstructor(day).days)
  const [lastDay, setLastDay] = useState(daysConstructor(day).lastDay)

  useEffect(() => {
    store.dispatch(setDate(day.format('YYYY-MM-DD')))
    setCurrentDate(day)
  }, [])

  const scroll = (event) => {
    if (event.target.scrollWidth - event.target.scrollLeft - event.target.clientWidth < 1) {
      setDays(days.concat(daysConstructor(lastDay).days))
      setLastDay(daysConstructor(lastDay).lastDay)
    }
  }

  return (
    <div className={ styles.daysContainer } onScroll={(event) => scroll(event) }>
      {days.map((date, index) => {
        return (
          <Day
            key={ `key${index}` }
            date={ date }
            setCurrentDate={ (date) => setCurrentDate(date) }
          />
        )
      })}
    </div>
  )
}

Calendar.propTypes = {
  setCurrentDate: PropTypes.func,
}

export default Calendar
