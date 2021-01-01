import "./App.css";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import fetcher from "./fetcher";
import moment from "moment";

import MyCalendar from "./components/MyCalendar";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function App() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetcher.get("/cases").then(({ data }) => {
      const events = data.reduce((acc, courtCase) => {
        const event = {
          title: courtCase.landlord,
          start: new Date(courtCase.court_date),
          end: new Date(courtCase.court_date),
          allDay: true,
          caseId: courtCase.case_id,
          hearingType: courtCase.hearing_type,
        };
        acc.push(event);
        return acc;
      }, []);
      setData(events);
    });
  }, []);

  return (
    <div className="App">
      <MyCalendar
        events={data}
        onSelectSlot={(event) => {
          const startDate = moment(event.slots[0]).startOf('day');
          const endDate = moment(event.slots[event.slots.length - 1]).endOf('day');
          let courtCases = data.reduce((acc, courtCase) => {
            const courtCaseDate = moment(courtCase.start);
            const isBetween = courtCaseDate.isBetween(
              startDate,
              endDate,
              undefined,
              "[]"
            );
            if (isBetween) {
              acc.push(courtCase);
            }
            return acc;
          }, []);
          courtCases = courtCases.reduce((acc, courtCase)=>{
            acc[courtCase.title] = acc[courtCase.title] ? acc[courtCase.title]+1: 1
            return acc;
          }, {})
          alert(`Cases: ${Object.keys(courtCases).length}\n${Object.keys(courtCases).map(courtCaseKey => `\nLandlord: ${courtCaseKey}  Count:${courtCases[courtCaseKey]}`)}`);
        }}
        onSelectEvent={(event) => {
          console.log(event);
          alert(JSON.stringify(event));
        }}
      />
    </div>
  );
}

export default App;
