import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

const TaskContainer = ({ location, component: Component }) => {
  return (
    <>
      { !location.props ? (
        <Redirect to="/calendar" />
      ) : (
        <Component locProps={ location.props } />
      ) }
    </>
  )
}

TaskContainer.propTypes = {
  location: PropTypes.object,
  component: PropTypes.func,
}

export default TaskContainer
