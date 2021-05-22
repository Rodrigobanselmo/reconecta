import React, { Fragment } from 'react';

import useCalendar from '../../../../hooks/useCalendar';
import IconButton from '@material-ui/core/IconButton';
import {Icons} from '../../../Icons/iconsDashboard'
import NewIconButton from '../../Buttons/NewIconButton'
import { darken, fade } from "@material-ui/core/styles";
import styled, {css} from "styled-components";
import {ModalButtons} from '../../MuiHelpers/ModalButtons'
import Modal from './Modal'
import {InputDate} from '../../MuiHelpers/Input'
import { DatePicker } from "@material-ui/pickers";
import {EspecialSelector} from '../../MuiHelpers/EspecialSelector'
import { CardDiv,ContainerWeekdays,ContainerWeek,Header,Week,CalendarContainer, } from './styles'
import Input, {SelectedEnd} from '../../MuiHelpers/Input'
import Checkbox from '@material-ui/core/Checkbox';
import DateWeekDaySelector from '../Components/DateWeekDaySelector'
import HoursSelection from '../Components/HourSelector'
import WeekDaysSelector from '../Components/WeekDaysSelector'
import ModalPick from '../Components/ModalPick'
import { useSelector,useDispatch } from 'react-redux'

const sortTime = function (a, b) {
  if (parseInt(a.split(':')[0]) > parseInt(b.split(':')[0])) {
      return 1;
  }
  if (parseInt(b.split(':')[0]) > parseInt(a.split(':')[0])) {
      return -1;
  }
  if (parseInt(a.split(':')[1]) > parseInt(b.split(':')[1])) {
    return 1;
}
  if (parseInt(b.split(':')[1]) > parseInt(a.split(':')[1])) {
    return -1;
  }
  return 0;
};

const Calendar = () => {

  const calendar = useSelector(state => state.calendar)

  const { calendarRows, selectedDate, todayFormatted, daysShort, daysArr, monthNames, getNextMonth, getPrevMonth } = useCalendar();
  const [selected, setSelected] = React.useState(todayFormatted)
  const [hours, setHours] = React.useState(calendar)
  const [open, setOpen] = React.useState(false)

  const getPrevWeek = () => {
    Object.keys(calendarRows).map(key=>{

      if (calendarRows[key].findIndex( i=>i.date== selected) != -1 && calendarRows[parseInt(key)-1]) {
        setSelected(calendarRows[parseInt(key)-1][0].date)
      } else if (calendarRows[key].findIndex( i=>i.date== selected) != -1 && !calendarRows[parseInt(key)-1]) {

        const month = parseInt(calendarRows[3][0].date.split('-')[1])
        const year = parseInt(calendarRows[3][0].date.split('-')[2])

        function getMonth() {
          if (month-1 == 0) return 12
          return (month-1)
        }
        function getYear() {
          if (month-1 == 0) return year-1
          return year
        }

        function onGetLastDay(day) {
          console.log('day',`${day}-${getMonth()}-${getYear()}`)
          setSelected(`${day}-${getMonth()}-${getYear()}`)
        }

        getPrevMonth({week:onGetLastDay})
      }
    })
  }

  const getNextWeek = () => {
    Object.keys(calendarRows).map(key=>{

      if (calendarRows[key].findIndex( i=>i.date== selected) != -1 && parseInt(key) == 5 && calendarRows[6] && calendarRows[6].findIndex( i=>i.classes== '') == -1) {
        const month = parseInt(calendarRows[3][0].date.split('-')[1])
        const year = parseInt(calendarRows[3][0].date.split('-')[2])

        function getMonth() {
          if (month+1 > 12) return 1
          return (month+1)
        }
        function getYear() {
          if (month+1 > 12) return year+1
          return year
        }
        console.log('DAY+WEEK',`1-${getMonth()}-${getYear()}`)
        setSelected(`1-${getMonth()}-${getYear()}`)
        getNextMonth()
      }


        if (calendarRows[key].findIndex( i=>i.date== selected) != -1 && calendarRows[parseInt(key)+1]) {
        setSelected(calendarRows[parseInt(key)+1][0].date)
        // console.log(calendarRows[parseInt(key)+1][0].date)
      } else if (calendarRows[key].findIndex( i=>i.date== selected) != -1 && !calendarRows[parseInt(key)+1]) {
        const month = parseInt(calendarRows[3][0].date.split('-')[1])
        const year = parseInt(calendarRows[3][0].date.split('-')[2])

        function getMonth() {
          if (month+1 > 12) return 1
          return (month+1)
        }
        function getYear() {
          if (month+1 > 12) return year+1
          return year
        }
        console.log('DAY+WEEK',`1-${getMonth()}-${getYear()}`)
        setSelected(`1-${getMonth()}-${getYear()}`)
        getNextMonth()
      }
    })
  }

  return(
    <>
    <CalendarContainer>
      <Header>
        <div style={{display:'flex',alignItems:'center'}}>
          <p style={{marginRight:10}}>{`${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}</p>
          <div>
            <IconButton  size={'small'} style={{marginRight:10}} aria-label={'leftArrowC'} onClick={getPrevWeek}>
                <Icons  style={{fontSize:30}} type={'KeyboardArrowLeft'} />
            </IconButton>
            <IconButton size={'small'} style={{marginRight:-16}} aria-label={'rightArrowC'} onClick={getNextWeek}>
                <Icons style={{fontSize:30}} type={'KeyboardArrowRightIcon'} />
            </IconButton>
          </div>
        </div>
        <NewIconButton
          onClick={()=>setOpen(true)}
        />


      </Header>
      {Object.values(calendarRows).map((cols) => {
        if (cols.findIndex( i=>i.date== selected) == -1) return null
        return (
          <Week key={cols[0].date}>
            {cols.map((col,index) => {
              const isToday = col.date === todayFormatted;
              const isSelected = col.date === selected;
              return (
              <ContainerWeek key={col.date} last={index==6}>
                <ContainerWeekdays today={isToday}>
                  <span>{col.value}</span>
                  <p style={{textAlign:'left',paddingLeft:5,fontSize:14,fontWeight:'bold'}} >
                    {daysShort[index]}
                  </p>
                  <p style={{position:'absolute',bottom:2,right:5,fontSize:10}}>{`${monthNames[selectedDate.getMonth()]}`}</p>
                </ContainerWeekdays>
                {hours && hours[col.date] &&  Object.keys(hours[col.date].time).sort(sortTime).map((dateKey,indexDate) => {
                  const local = hours[col.date].time[dateKey].local
                  const space = hours[col.date].time[dateKey].space
                  return (
                    <CardDiv
                      online={local=='online'}
                      fill={space=='fill'}
                      toConfirm={space=='toConfirm'}
                      cancel={space=='cancel'}
                      prev={col.classes.includes('in-prev-month')}
                    >
                      <p>{dateKey}</p>
                      <p style={{fontSize:10}}>Atendimento {hours[col.date].time[dateKey].local}</p>
                      {/* <p style={{position:'absolute',bottom:3,right:5,fontSize:10}}>
                        {space=='fill'?'ocupado':space=='toConfirm'?'aguardando':space=='free'?'Livre':'cancelado'}
                      </p> */}
                    </CardDiv>
                  )
                })}
              </ContainerWeek>
            )
            })}
          </Week>
        )})
      }
        {/* <Modal open={open} setOpen={setOpen}/> */}
        <ModalPick open={open} setOpen={setOpen}/>
    </CalendarContainer>
    </>
  );
}

export default Calendar;
