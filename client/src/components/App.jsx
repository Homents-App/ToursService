import React, { useState, useEffect } from 'react';

import { getData, submitForm } from '../utils/Logic';
import '../styles/Globals.css';
import s from '../styles/App.css';

import TourRequest from './TourRequest';
import TourType from './TourType';
import Calendar from './Calendar/Calendar';
import TimeDropdown from './Calendar/TimeDropdown';
import RequestForm from './Form/RequestForm';
import Disclaimer from './Disclaimer';
import AgentList from './Agents/AgentList';

const App = () => {
  // State for API calls
  const [requests, setRequests] = useState([]);
  const [agents, setAgents] = useState([]);

  // State for user inputs
  const [tour, toggleTour] = useState(true);
  const [digital, setDigital] = useState(false);
  const [currentDate, setDate] = useState('');
  const [call, setCall] = useState(false);
  const [time, setTime] = useState('');
  const [curAgent, setAgent] = useState('');

  useEffect(() => {
    var path = window.location.pathname.split('/');
    console.log('path: ', path);
    var id = 5;
    getData(setRequests, setAgents, id);
  }, []);

  const submit = (form) => {
    const toSubmit = !tour ? { curAgent, ...form }
      : { date: currentDate, type: digital, time, ...form };
    var id = 5;
    submitForm({ call, id, ...toSubmit }).then(() => getData(setRequests, setAgents, id));
  };

  return (
    <div id={s.app}>
      <TourRequest tour={tour} toggleTour={toggleTour} />
      <div id={s.module}>
        {tour && (
          <div>
            <TourType digital={digital} setDigital={setDigital} />
            <Calendar currentDate={currentDate} setDate={setDate} />
            <TimeDropdown occupied={requests} currentDate={currentDate} setTime={setTime} />
          </div>
        )}

        <RequestForm tour={tour} call={call} setCall={setCall} submit={submit} />
        <Disclaimer tour={tour} />
        {!tour && (<AgentList curAgent={curAgent} agents={agents} setAgent={setAgent} />)}
      </div>

    </div>
  );
};

export default App;
