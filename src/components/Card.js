import React from 'react';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles( theme => ({
    root: {
        border: '#61dafb solid 2px',
        borderRadius: 15,
        padding: 20,
        margin: 20,
        width: '25%',
        minWidth: 300,
    }
}));

export default function Card(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>{props.caption}</div>
            <br/>
            <div>Court Date: {props.courtDate}</div>
            <div>Hearing Type: {props.hearingType}</div>
            <div>Case Id: {props.caseId}</div>
            <div>Person Name: {props.personName}</div>
          </div>
    )
}