import { useEffect, useState } from "react";
import { makeStyles, Modal } from "@material-ui/core";
import {Switch, Route} from 'react-router-dom';

import Home from './components/home/Home'
import About from './components/about/About'


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
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>

      </Switch>
    </div>
  )
}

export default App;
