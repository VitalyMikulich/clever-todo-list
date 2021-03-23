import React from 'react'
import PropTypes from 'prop-types'

const TaskContainer = ({ currentDate }) => {
  console.log(currentDate)
  const taskCount = 1;
  return (
    <div>
      <div>{ taskCount } Task Today</div>
      { !currentDate ? null : <div>{ currentDate.format() }</div> }
    </div>
  )
}

TaskContainer.propTypes = {
  currentDate: PropTypes.object
}

export default TaskContainer
