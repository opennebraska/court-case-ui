import "./App.css";
import { useEffect, useState } from "react";
import { makeStyles, Modal } from "@material-ui/core";
import fetcher from "./fetcher";
import moment from "moment";

import MyCalendar from "./components/MyCalendar";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 500,
    maxHeight: 700,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: 'auto'
  },
  modalText: {
    textAlign: 'left'
  }
}));

function App() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [bodyText, setBodyText] = useState([]);

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

  const modalBody = (
      <div style={modalStyle} className={classes.modal}>
        <span className={classes.modalText}>
          <h3>Cases: {Object.keys(bodyText).length}</h3>
          {Object.keys(bodyText).length > 0 && <table>
            <thead>
              <th>Landlord</th>
              <th>Cases</th>
            </thead>
            <tbody>
            {Object.keys(bodyText).map(bodyTextKey => (
                <tr>
                  <td>{bodyTextKey}</td>
                  <td>{bodyText[bodyTextKey]}</td>
                </tr>
            ))}
            </tbody>
          </table>}
        </span>
      </div>
  )

    const handleOpen = (bodyText) => {
      setOpenModal(true);
      setBodyText(bodyText);
    }

    const handleClose = () => {
      setOpenModal(false);
    }

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
          courtCases = Object.keys(courtCases).sort().reduce(
              (obj, key) => {
                obj[key] = courtCases[key];
                return obj;
              },
              {}
          );
          handleOpen(courtCases);
        }}
        onSelectEvent={(event) => {
          console.log(event);
          alert(JSON.stringify(event));
        }}
      />
        <Modal
            open={openModal}
            onClose={handleClose}
        >
          {modalBody}
        </Modal>
    </div>
  );
}

export default App;
