import React from 'react';

import useCalendar from '../../../../hooks/useCalendar';
import styled from "styled-components";
import {ModalButtons} from '../../MuiHelpers/ModalButtons'
import {SelectedEnd} from '../../MuiHelpers/Input'
import Checkbox from '@material-ui/core/Checkbox';
import DateWeekDaySelector from '../Components/DateWeekDaySelector'
import HoursSelection from '../Components/HourSelector'
import WeekDaysSelector from '../Components/WeekDaysSelector'
import { AddCalendarDate } from '../../../../services/firestoreCalendar'
import {useAuth} from '../../../../context/AuthContext'
import './App.css'

const TextHour = styled.span`
  margin-right: 6px;
  font-size:16px;
  padding-bottom: 6px;
  display: inline-block;
  border-bottom:1px solid ${({theme})=> theme.palette.text.third };
  opacity:0.7;
  & span {
    font-size:14px;
  }
`;

export default function DateSelection({open,setOpen,onConfirm}) {

  const { daysArr } = useCalendar();
  const {currentUser} = useAuth();

  var time = new Date();
  var newDate = new Date();
  newDate.setDate(time.getDate() + 28);

  const [dateInput, setDateInput] = React.useState(new Date());
  const [dateInputEnd, setDateInputEnd] = React.useState(newDate);
  const [typeSelected, setTypeSelected] = React.useState(1);
  const [typeSelected2, setTypeSelected2] = React.useState(1);
  const [hoursSelected, setHoursSelected] = React.useState((new Date()).getHours());
  const [minutesSelected, setMinutesSelected] = React.useState(0);
  const [hoursSelectedAtd, setHoursSelectedAtd] = React.useState(1);
  const [minutesSelectedAtd, setMinutesSelectedAtd] = React.useState(0);
  const [checked, setChecked] = React.useState(false);
  const [checkedB, setCheckedB] = React.useState(false);
  const [daysSelected, setDaysSelected] = React.useState([dateInput.getDay()]);

  const typesToSelet = ['1 semana', '2 semanas', '3 semanas', '4 semanas', '5 semanas', '6 semanas']
  const typesToSelet2 = ['1 atendimento', '2 atendimentos', '3 atendimentos', '4 atendimentos', '5 atendimentos', '6 atendimentos', '7 atendimentos', '8 atendimentos', '9 atendimentos', '10 atendimentos', '11 atendimentos', '12 atendimentos']

  function onAddTime() {
    onConfirm()

    function checkSuccess(response) {
      // setData({...response})
    }

    function checkError(error) {
      // setLoadContent(false)
      // setLoaderDash(false)
      // setTimeout(() => {
        // notification.error({message:error,modal:false})
      // }, 600);
    }
    checkSuccess()
    // onAddCalendarDate(data,currentUser,checkSuccess,checkError)

    setOpen(false)
    setHoursSelected((new Date()).getHours())
    setMinutesSelected(0)
    setDateInput(new Date())
    setDaysSelected([dateInput.getDay()])
  }

  function onCloseModalAdd() {
    setOpen(false)
    setHoursSelected((new Date()).getHours())
    setMinutesSelected(0)
    setDateInput(new Date())
    setDaysSelected([dateInput.getDay()])
  }

  const handleDateChange = (date) => {
    setDateInput(date)
    setDaysSelected([date.getDay()])
  };
  const handleDateChangeEnd = (date) => {
    setDateInputEnd(date)
  };

  function onSelectedDay(dayIndex) {
    if (daysSelected.includes(dayIndex)) {
      setDaysSelected(day=>[...day.filter(i=>i!=dayIndex)])
    } else {
      setDaysSelected(day=>[...day,dayIndex])
    }
  }
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeB = (event) => {
    setCheckedB(event.target.checked);
  };

  const getFinalHour = (start,end,time) => {
    const totalMin = (start+end*time)/60
    const hour = Math.trunc(totalMin)
    const minutes = `${Math.round((totalMin - Math.floor(totalMin))*60)}`
    return [hour,minutes]
  };


  return (
    <ModalButtons
      open={Boolean(open)}
      disable={false}
      onClick={onAddTime}
      onClose={onCloseModalAdd}
      title={'Novo Horário'}
      padding={'large'}
  >
    <div style={{backgroundColor:'#fff',padding:0}}>
      <p style={{fontSize:16,marginBottom:15}}>Selecione uma data</p>
      <WeekDaysSelector onSelectedDay={onSelectedDay} daysSelected={daysSelected}/>
      <div style={{flexDirection:'row',display:'flex',alignItems:'center',justifyContent:"flex-start",marginTop:20}}>
        <DateWeekDaySelector
          dateInput={dateInput}
          setDateInput={handleDateChange}
          yearShow
        />
        <div style={{marginBottom:-13}}>
          <span style={{zIndex:110,marginBottom:5,display:'inline-block'}}>Horário de início do atendimento</span>
          <HoursSelection setMin={setMinutesSelected} setHour={setHoursSelected} min={minutesSelected} hour={hoursSelected}/>
        </div>
      </div>
      <span style={{zIndex:110,marginBottom:5,display:'inline-block',marginTop:25}}>
        Tempo estimado de atendimento
      </span>
      <HoursSelection setMin={setMinutesSelectedAtd} setHour={setHoursSelectedAtd} min={minutesSelectedAtd} hour={hoursSelectedAtd}/>

      <div style={{flexDirection:'row',marginTop:15,display:'flex',alignItems:'flex-start',justifyContent:"flex-start"}}>
        <div style={{minWidth:300,flexDirection:'column',marginBottom:0}}>
          <span style={{zIndex:110,marginBottom:5,display:'inline-block'}}>
            Número de atendimentos:
          </span>
          <div>
            <SelectedEnd
              width={'200px'}
              title={''}
              value={typeSelected2 == 1 ? typeSelected2:typesToSelet2.findIndex(i=>i==typeSelected2)+1}
              setData={(selected)=>setTypeSelected2(selected)}
              data={typesToSelet2}
              variant="outlined"
              />
            </div>
        </div>
        <div style={{flexDirection:'column',marginBottom:0}}>
          <span style={{zIndex:110,marginBottom:20,display:'inline-block'}}>
            Horário de termino do atendimento:
          </span>
          <div style={{flexDirection:'row',marginBottom:0}}>
            <TextHour >
              {getFinalHour(hoursSelected*60+minutesSelected,hoursSelectedAtd*60+minutesSelectedAtd,typeSelected2 == 1 ? typeSelected2:typesToSelet2.findIndex(i=>i==typeSelected2)+1)[0]} <span>h</span>
            </TextHour>
            <TextHour style={{zIndex:110,marginBottom:5,display:'inline-block'}}>
              {getFinalHour(hoursSelected*60+minutesSelected,hoursSelectedAtd*60+minutesSelectedAtd,typeSelected2 == 1 ? typeSelected2:typesToSelet2.findIndex(i=>i==typeSelected2)+1)[1]} <span>min</span>
            </TextHour>
          </div>
        </div>
      </div>


      <div style={{flexDirection:'row',marginTop:10,display:'flex',alignItems:'center',paddingBottom:10,marginBottom:20,justifyContent:"flex-start",
        borderBottom:checked?'1px solid #00000022':'0px solid #00000055'
      }}>
        <Checkbox
          style={{margin:0,padding:'0 5px 0 0'}}
          checked={checked}
          size='small'
          onChange={handleChange}
          name="checkedB"
          color="primary"
        />
        <span style={{zIndex:110,marginBottom:0,display:'inline-block',marginTop:0}}>
          Repetir
        </span>
      </div>
      {checked&&
      <div style={{flexDirection:'row',marginTop:15,display:'flex',alignItems:'flex-start',justifyContent:"flex-start"}}>
        <div style={{minWidth:300,flexDirection:'column',marginBottom:0}}>
          <span style={{zIndex:110,marginBottom:0,display:'inline-block'}}>
            Repetir a cada:
          </span>
          <div>
          <SelectedEnd
            width={'200px'}
            title={''}
            value={typeSelected == 1 ? typeSelected:typesToSelet.findIndex(i=>i==typeSelected)+1}
            setData={(selected)=>setTypeSelected(selected)}
            data={typesToSelet}
            variant="outlined"
          />
          </div>
        </div>
        <div style={{flexDirection:'row',display:'flex',alignItems:'center',justifyContent:"flex-start"}}>
          <div style={{flexDirection:'column',marginBottom:0}}>
          <div style={{minWidth:300,flexDirection:'column',marginBottom:0}}>
            <Checkbox
              style={{margin:0,padding:'0 5px 0 0'}}
              checked={checkedB}
              size='small'
              onChange={handleChangeB}
              name="checkedC"
              color="primary"
            />
            <span style={{zIndex:110,marginBottom:0,display:'inline-block',marginTop:0}}>
              Data de término
            </span>
          </div>
          {checkedB &&
            <div>
              <DateWeekDaySelector
                yearShow
                dateInput={dateInputEnd}
                setDateInput={handleDateChangeEnd}
                text=''
              />
            </div>
          }
        </div>
        </div>
      </div>
      }
    </div>
  </ModalButtons>
  )
}
