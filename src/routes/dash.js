import { HomeAdmin,Home,Team,Calendar } from '../containers';
import {
  HOME_ADMIN,
  DASHBOARD,
  TEAM,
  CALENDAR_ADMIN
} from './routesNames'

const routes = [
  {
    path: DASHBOARD,
    component: Home,
    exact:true,
  },
  {
    path: HOME_ADMIN,
    component: HomeAdmin,
    admin:true,
  },
  {
    path: CALENDAR_ADMIN,
    component: Calendar,
    admin:true,
  },
  {
    path: TEAM,
    component: Team,
    exact:true,
    //isPrivate:true,
    //privateRoute:DASHBOARD,
    //infoUser:['access'],
    //condition:[['admin','master']],
    //Equal:[true],
  },
];


export default routes

