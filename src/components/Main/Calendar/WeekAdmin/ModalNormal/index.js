import React, { Fragment } from 'react';

import useCalendar from '../../../../hooks/useCalendar';
import IconButton from '@material-ui/core/IconButton';
import {Icons} from '../../../Icons/iconsDashboard'
import NewIconButton from '../../Buttons/NewIconButton'
import { darken, fade } from "@material-ui/core/styles";
import styled, {css} from "styled-components";
import {ModalButtons} from '../../MuiHelpers/ModalButtons'
import {InputDate} from '../../MuiHelpers/Input'
import { DatePicker } from "@material-ui/pickers";



const Modal = () => {
  const { calendarRows, selectedDate, todayFormatted, daysShort, monthNames, getNextMonth, getPrevMonth } = useCalendar();
  const [selected, setSelected] = React.useState(todayFormatted)
  const [hours, setHours] = React.useState(aulas)
  const [open, setOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const dateClickHandler = date => {
    console.log(date);
  }

  function onAddTime() {
  }

  function onCloseModalAdd() {
    setOpen(false)
  }

  function onDisable() {
    return false
    // if (open == 'del') return false
    // if (hasTitle && title=='') return true
    // if (open == 'edit' && actionsData?.checklistId && data && data.filter(i=>i.title == title.trim()).length == 1 && data.filter(i=>i.title == title.trim())[0].id == actionsData.checklistId) return false
    // if (data && data.filter(i=>i.title == title.trim()).length > 0) return true
   }

  const handleDateChange = (date) => {
    // if (date == null) return setUnform(unform=>({...unform,creation:new Date()}))
    // setUnform(unform=>({...unform,creation:date}))
    setSelectedDate(date)
  };

  return(
    <div>

    </div>
  );
}

export default Modal;
