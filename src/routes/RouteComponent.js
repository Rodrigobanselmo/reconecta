import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {
  HOME_ADMIN,
  DASHBOARD,
  SIGN,
} from './routesNames'
// import {useNotification} from "../context/NotificationContext"

export default function RouteComponent({ component: Component,privateRoute, ...rest }) {

  const { currentUser } = useAuth()
  // const [location, setLocation] = React.useState(false)
  // const notification = useNotification()

  var locationRedirect = false

  function isAdminRoute() {
    if (rest?.location&&rest.location?.pathname && rest.location.pathname.split('/')[2] && rest.location.pathname.split('/')[2] == 'admin')  {
      if (currentUser?.access && currentUser.access == 'admin') {
        return true
      } else {
        locationRedirect = DASHBOARD
        return false
      }
    } else {
      if (currentUser?.access && currentUser.access == 'admin') {
        locationRedirect = HOME_ADMIN
        return false
      } else {
        return true
      }
    }
  }


  function onValidate() {
    if (currentUser) {
      if (!isAdminRoute()) {
        return false
      }
      return true
    } else {
      locationRedirect = SIGN
      return false
    }
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (rest.isPrivate) return onValidate() ? <Component {...props} />
        :
        <>
        <Redirect to={{
          pathname: locationRedirect?locationRedirect:privateRoute,
          state: { from: props.location }
        }} />
{/*         {notification.error({message:'Você não possui autorização para acessar essa area.'})} */}
        {/* {console.log(props.location)} */}
        </>

        else return <Component {...props} />
      }}
    ></Route>
  )
}

