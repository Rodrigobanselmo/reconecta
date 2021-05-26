import React, { Component } from 'react';
import {useNotification} from '../../../context/NotificationContext'
import {useLoaderDashboard} from '../../../context/LoadDashContext'
import Calendar from '../../../components/Main/Calendar/WeekAdmin'
import Header from '../../../components/Dashboard/Components/Blocks/Header'

export default function Home() {

  const { setLoaderDash } = useLoaderDashboard();
  React.useEffect(() => {
    setTimeout(() => {
      setLoaderDash(false)
    }, 1000);
  }, [])

  return (
    <div style={{justifyContent:'center',margin:'auto',alignItems:'center',flex:1}}>
      <Header icons={'Calendar'} title={'Gerenciar seus atendimentos'} video={true}/>
      <Calendar/>
    </div>
  );
}

