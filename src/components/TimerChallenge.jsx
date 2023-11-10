import React, { useState, useRef } from 'react';
import ResultModal from './ResultModal';

const TimerChallenge = ({ title, targetTime }) => {
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);
    const timer = useRef(); // timer get own timer ref in every component, and will NOT reset when component reexecutes (the value of ref is saved and not changewhen component reexecutes as weel as the conpoment NOT reexecutes when the valueof ref changes
    const dialog = useRef();

    const handleStart = () => {
        timer.current = setTimeout(() => {
            setTimerExpired(true);
            dialog.current.showModal();  //showModal() -standart built-in method to open dialog
        }, targetTime * 1000);
        setTimerStarted(true);
    };
    const handleStop = () => {
        clearTimeout(timer.current);
        setTimerStarted(false);
        setTimerExpired(false);
    };

    return (
      <>
          <ResultModal
                ref = {dialog}
                targetTime={targetTime}
                result="lost"/>

          <section className="challenge">
              <h2>
                  {title}
              </h2>
              <p className="challenge-time">
                  {targetTime} second{targetTime > 1 ? 's' : ''}
              </p>
              <p>
                  <button onClick={timerStarted ? handleStop : handleStart}>
                      {timerStarted ? 'Stop' : 'Start'}
                  </button>
              </p>
              <p className={timerStarted ? 'active' : undefined}>
                  {timerStarted ? 'Time running...' : 'Timer is not active'}
              </p>
          </section>
      </>
    );
};
export default TimerChallenge;
