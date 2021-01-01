import React from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {makeStyles} from '@material-ui/core';

const localizer = momentLocalizer(moment);

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh'
    }
}))

export default function MyCalendar(props) {

    const classes = useStyles();
    const events = props.events || []
    return (
        <div>
            <Calendar
                selectable
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                events={events}
                className={classes.root}
                onSelectSlot={props.onSelectSlot}
            ></Calendar>
            
        </div>
    )
}
