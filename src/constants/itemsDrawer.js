import {
  HOME_ADMIN,
  TEAM,
  CALENDAR_ADMIN
} from '../routes/routesNames'

const itemsList = [
  {
    text: "Home",
    description:'Página principal',
    to:HOME_ADMIN,
    icon: 'Apps',
    id:HOME_ADMIN,
    onClick: () => {}
  },
  {
    text: "Equipe",
    description:'Gerenciar equipe',
    to:TEAM,
    icon: 'Person',
    id:TEAM,
    onClick: () => {}
  },
  {
    text: "Agenda",
    description:'Gerenciamento da agenda de horários e afazeres',
    to:CALENDAR_ADMIN,
    icon: 'Calendar',
    id:CALENDAR_ADMIN,
    onClick: () => {}
  }
];

export const lists = [
  {
    category: "Geral",
    id:Math.random(),
    search:'Geral principal dashboard',
    text:'Geral principal dashboard',
    items: itemsList
  },
];


