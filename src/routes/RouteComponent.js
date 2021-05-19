import React from "react"
import { Route, Redirect } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
// import {useNotification} from "../context/NotificationContext"

export default function RouteComponent({ component: Component,privateRoute, ...rest }) {

  // const { currentUser } = useAuth()
  // const notification = useNotification()

  function onValidate() {
    // if (currentUser) {
    //   return true
    // } else {
    //   return false
    // }
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (rest.isPrivate) return onValidate() ? <Component {...props} />
        :
        <>
        <Redirect to={{
          pathname: privateRoute,
          state: { from: props.location }
        }} />
{/*         {notification.error({message:'Você não possui autorização para acessar essa area.'})} */}
        {console.log(props.location)}
        </>

        else return <Component {...props} />
      }}
    ></Route>
  )
}

