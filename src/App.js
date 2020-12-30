import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'

function App() {
  const [data, setData] = useState()
  useEffect(()=>{
    // fetch('https://nebraska-landlord-courtcases.herokuapp.com/cases/').then(response => response.json()).then(data=>{
    //   setData(data)
    // })
    setData([
      {
        "court_date": "2020-12-09T09:00",
        "hearing_type": "Arraignment",
        "case_id": "TEST001",
        "caption": "Test caption",
        "person_name": "test"
      },
      {
        "court_date": "2020-12-14T00:00",
        "hearing_type": "Arraignment",
        "case_id": "CR200021590",
        "caption": "State v. Cal D McCoy",
        "person_name": "test"
      }])
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        {data.map(courtCase=> (
          <div className={"card"}>
            <div>Court Date: {courtCase.court_date}</div>
            <div>Hearing Type: {courtCase.hearing_type}</div>
            <div>Case Id: {courtCase.case_id}</div>
            <div>Caption: {courtCase.caption}</div>
            <div>Person Name: {courtCase.person_name}</div>
          </div>
        ))}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
