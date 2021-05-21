import React, { Fragment } from 'react';

import useCalendar from '../../../hooks/useCalendar';
import IconButton from '@material-ui/core/IconButton';
import {Icons} from '../../../components/Icons/iconsDashboard'
import styled, {css} from "styled-components";

const ContainerWeekdays = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding:5px;
  border-radius:10px;
  background-color: ${({theme})=> theme.palette.primary.mainPurple };
  /* border: 1px solid ${({theme})=> theme.palette.background.line }; */
`;

const ContainerWeek = styled.div`
  display: flex;
  flex:1;
  flex-direction: column;
  background-color: ${({theme})=> theme.palette.primary.mainPurple };
  border-radius:10px;
  margin-right: ${({last})=> last?0:'10px'};

  @media screen and (max-width: 1000px) {
    margin-right: 0;
  }
`;


const Circle = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius:20px;
  transition: all 0.2s;
  width:18px;
  height:18px;
  font-size:10px;

  & span {
    padding-left:1px;
  }


  ${props => props.today && css`
    background-color: ${({theme})=> theme.palette.primary.mainBlue };
    color: ${({theme})=> theme.palette.primary.contrastText };
  `}
`;


const Header = styled.div`
  padding: 0px 20px;
  margin-bottom:20px;
  flex-direction:row;
  justify-content:space-between;
  display: flex;
  font-size:22px;
  color: ${({theme})=> theme.palette.text.secondary };
`;


const Week = styled.div`
  display:flex;
  flex:1;
  justify-content: space-between;
  flex-direction:row;
  margin:0 3px;

  @media screen and (max-width: 1000px) {
    flex-direction:column;
  }
`;

const Day = styled.div`
`;


const CalendarContainer = styled.div`
  background-color: ${({theme})=>theme.palette.background.paper};
  padding: 20px 15px;
  border-radius:10px;
  box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.22);
  display:flex;
  flex:1;
  flex-direction:column;
`;

const Calendar = () => {
  const { calendarRows, selectedDate, todayFormatted, daysShort, monthNames, getNextMonth, getPrevMonth } = useCalendar();
  const [selected, setSelected] = React.useState(todayFormatted)

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

  const dateClickHandler = date => {
    console.log(date);
  }

  console.log(calendarRows)

  const aulas = {
    '25-5-2021':{
      date:'25-5-2021',
      type:'free'
    },
    '29-5-2021':{
      date:'25-5-2021',
      type:'free'
    },
    '22-5-2021':{
      date:'25-5-2021',
      type:'free'
    },
    '26-5-2021':{
      date:'25-5-2021',
      type:'fill',
    },
  }

  return(
    <CalendarContainer>
      <Header>
        <p>{`${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}</p>
        <div>
          <IconButton  size={'small'} style={{marginRight:10}} aria-label={'leftArrowC'} onClick={getPrevWeek}>
              <Icons  style={{fontSize:30}} type={'KeyboardArrowLeft'} />
          </IconButton>
          <IconButton size={'small'} style={{marginRight:-16}} aria-label={'rightArrowC'} onClick={getNextWeek}>
              <Icons style={{fontSize:30}} type={'KeyboardArrowRightIcon'} />
          </IconButton>
        </div>
      </Header>
          {Object.values(calendarRows).map((cols) => {
            if (cols.findIndex( i=>i.date== selected) == -1) return null
            return (
              <Week>
                {cols.map((col,index) => {
                  const isToday = col.date === todayFormatted;
                  const isSelected = col.date === selected;
                  return (
                  <ContainerWeek key={col.date} last={index==6}>
                    <ContainerWeekdays>
                      <Day  prev={col.classes.includes('in-prev-month')} onClick={() => dateClickHandler(col.date)}>
                        <Circle today={isToday}>
                          <span>{col.value}</span>
                        </Circle>
                      </Day>
                      <p style={{textAlign:'left',paddingLeft:5,fontSize:14,fontWeight:'bold'}} >
                        {daysShort[index]}
                      </p>
                    </ContainerWeekdays>
                    {cols.map((col,index) => {
                      return (
                        <p>10000</p>
                      )
                    })}
                  </ContainerWeek>
                )
                })}
              </Week>
            )})
          }
    </CalendarContainer>
  );
}

export default Calendar;
