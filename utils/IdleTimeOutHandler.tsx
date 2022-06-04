import React, { useEffect, useState } from 'react';
import moment from 'moment';
import idle from 'constants/idle';

import IdleTimeOutModal from 'components/IdleTimeOutModal';

const IdleTimeOutHandler = props => {
  let timerData = undefined;
  const [intervalData, setIntervalData] = useState(undefined);

  const [isLogout, setLogout] = useState(false);

  const [elapsedTime, setElaspedTime] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const events = ['click', 'load', 'keydown', 'mousemove'];

  const eventHandler = eventType => {
    if (!isLogout) {
      localStorage.setItem('lastInteractionTime', moment());

      if (timerData) {
        startTimer();
      }
    }
  };

  const addEvents = () => {
    startTimer();
    events.forEach(eventName => {
      window.addEventListener(eventName, eventHandler);
    });
  };

  const removeEvents = () => {
    events.forEach(eventName => {
      window.removeEventListener(eventName, eventHandler);
    });
  };

  useEffect(() => {
    addEvents();
  }, []);

  useEffect(() => {
    if (showModal) {
      setIntervalData(
        setInterval(() => {
          setElaspedTime(prev => prev + 1000);
        }, 1000)
      );
    } else {
      clearInterval(intervalData);
      setElaspedTime(0);
    }
  }, [showModal]);

  const startTimer = () => {
    if (timerData) {
      clearTimeout(timerData);
    }
    if (intervalData) {
      clearInterval(intervalData);
    }

    timerData = setTimeout(() => {
      let lastInteractionTime = localStorage.getItem('lastInteractionTime');
      const diff = moment.duration(moment().diff(moment(lastInteractionTime)));
      let timeOutInterval = props.timeOutInterval || idle.idleTime;

      if (!isLogout) {
        if (diff._milliseconds < timeOutInterval) {
          startTimer();
        } else {
          setShowModal(true);
        }
      }
    }, props.timeOutInterval || idle.idleTime);
  };

  const handleContinueSession = () => {
    setShowModal(false);
    setLogout(false);
    setElaspedTime(-1);
  };

  const handleLogout = () => {
    removeEvents();
    clearTimeout(timerData);
    clearInterval(intervalData);

    setLogout(true);
    setShowModal(false);

    props.logOut();

    new Notification('You have been logged out because of inactivity.');
  };

  return (
    <IdleTimeOutModal
      showModal={showModal}
      handleContinue={handleContinueSession}
      handleLogout={handleLogout}
      elapsedTime={elapsedTime}
    />
  );
};

export default IdleTimeOutHandler;
