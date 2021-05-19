import React from 'react';
import { useLocation } from 'react-router-dom';
import {useLoaderScreen} from '../context/LoaderContext'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Dashboard() {

  const query = useQuery()
  const {setLoad} = useLoaderScreen();

  React.useEffect(() => {
    setLoad(false)
  }, [])

  return (
    <div>
      Dash
    </div>
  );
}

export default Dashboard;
