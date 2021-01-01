import './App.css';
import {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core';
import fetcher from './fetcher';

import MyCalendar from './components/MyCalendar'
// import courtCases from './court_cases.json';


import Card from './components/Card'

const useStyles = makeStyles(theme => ({
  appHeader: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white'
  }
}))

function App() {
  const classes = useStyles();
  const [data, setData] = useState([])
  useEffect(()=>{
    fetcher.get('/cases').then(({data})=>{
        setData(data)
    })
  }, [])

  return (
    <div className="App">
      <MyCalendar/>
      <header className={classes.appHeader}>
        {data.map(courtCase=> (
          <Card
            courtDate={courtCase.court_date}
            hearingType={courtCase.hearing_type}
            caseId={courtCase.case_id}
            caption={courtCase.caption}
            personName={courtCase.person_name}
          />
        ))}
      </header>
    </div>
  );
}

export default App;
