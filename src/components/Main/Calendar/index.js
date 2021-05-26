import React, { Fragment } from 'react';

import useCalendar from '../../../hooks/useCalendar';
import IconButton from '@material-ui/core/IconButton';
import {Icons} from '../../../components/Icons/iconsDashboard'
import styled, {css} from "styled-components";

const LitDiv = styled.div`
  display: flex;
  flex-direction:row;
  justify-content:center;
  padding: 0 10px;
  margin-top:-10px;
`;

const LitCircle = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 1px;
  border-radius:20px;
  transition: all 0.2s;
  width:7px;
  height:7px;

  ${props => props.free && css`
    background-color: ${({theme})=> theme.palette.primary.mainLight };
  `}

  ${props => props.filll && css`
    background-color: ${({theme})=> theme.palette.primary.main };
  `}


`;

const Circle = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius:20px;
  transition: all 0.2s;
  width:35px;
  height:35px;


  ${props => props.today && css`
    background-color: ${({theme})=> theme.palette.primary.mainLight };
    color: ${({theme})=> theme.palette.primary.contrastText };
  `}

  ${props => props.selected && css`
    background-color: ${({theme})=> theme.palette.primary.main };
    color: ${({theme})=> theme.palette.primary.contrastText };
  `}

  &:hover {
    background-color: ${({theme})=> theme.palette.primary.main };
    color: ${({theme})=> theme.palette.primary.contrastText };
  }


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

const Table = styled.table`
`;

const Week = styled.tr`
`;

const Day = styled.td`
  padding:15px 10px;
  cursor: pointer;
  ${props => props.prev && css`
    opacity: 0;
  `}


`;

const CalendarContainer = styled.div`
  background-color: ${({theme})=>theme.palette.background.paper};
  padding: 20px 15px;
  border-radius:10px;
  box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.22);
`;

const Calendar = () => {
  const { calendarRows, selectedDate, todayFormatted, daysShort, monthNames, getNextMonth, getPrevMonth } = useCalendar();
  const [selected, setSelected] = React.useState(todayFormatted)
  const dateClickHandler = date => {
    console.log(date);
  }

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
          <IconButton  size={'small'} style={{marginRight:10}} aria-label={'leftArrowC'} onClick={getPrevMonth}>
              <Icons  style={{fontSize:30}} type={'KeyboardArrowLeft'} />
          </IconButton>
          <IconButton size={'small'} style={{marginRight:-16}} aria-label={'rightArrowC'} onClick={getNextMonth}>
              <Icons style={{fontSize:30}} type={'KeyboardArrowRightIcon'} />
          </IconButton>
        </div>
      </Header>
      <Table >
        <thead>
          <tr>
            {daysShort.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            Object.values(calendarRows).map(cols => {
              return <Week key={cols[0].date}>
                {cols.map(col => {
                 console.log(col)
                 const isToday = col.date === todayFormatted;
                 const isSelected = col.date === selected;
                 return (
                  <Day key={col.date} prev={col.classes.includes('in-prev-month')} onClick={() => dateClickHandler(col.date)}>
                    <Circle selected={isSelected} today={isToday}>
                      {col.value}
                    </Circle>
                    <LitDiv>
                      <LitCircle free={aulas[col.date] && aulas[col.date].type=='free'} filll={aulas[col.date] && aulas[col.date].type=='fill'}/>
                    </LitDiv>
                  </Day>
                 )
                })}
              </Week>
            })
          }
        </tbody>
      </Table>
    </CalendarContainer>
  );
}

export default Calendar;
