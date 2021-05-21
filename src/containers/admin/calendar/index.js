import React, { Component } from 'react';
import {useNotification} from '../../../context/NotificationContext'
import {useLoaderDashboard} from '../../../context/LoadDashContext'
import Calendar from '../../../components/Main/Calendar/week'
//undraw_mobile_testing_reah
export default function Home() {

  return (
    <div style={{justifyContent:'center',margin:'auto',alignItems:'center',flex:1}}>
      <Calendar/>
    </div>
  );
}

