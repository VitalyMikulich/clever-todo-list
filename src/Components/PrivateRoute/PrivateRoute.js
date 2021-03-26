import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { useStore } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const store = useStore()
  const { userID } = store.getState()
  console.log(userID)
  return (
    // <Route
    //   {...rest}
    //   render={(props) => {
    //     userID ? (
    //       <component />
    //     ) : (
    //       <Redirect
    //         to={{
    //           pathname: '/signin',
    //           state: {
    //             from: props.location,
    //           },
    //         }}
    //       />
    //     )
    //   }}
    // />
    // <div>
    //   {userID ? (
    //     <Route {...rest} component={Component} />
    //   ) : (
    //     <Redirect
    //       to={{
    //         pathname: '/signin',
    //         state: {
    //           // from: props.location,
    //         },
    //       }}
    //     />
    //   )}
    // </div>
    <Route { ...rest } render={(props) => userID ? <Component /> : <Redirect to={{pathname: '/signin',state: {from: props.location}}}/>}/>
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.any,
}

export default PrivateRoute
