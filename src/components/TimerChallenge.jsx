import React, { useState, useRef, useImperativeHandle } from 'react';
import ResultModal from './ResultModal';

const TimerChallenge = ({ title, targetTime }) => {
    const [timeRemaining, setTimeRemaining] = useState(targetTime*1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    const timer = useRef(); // timer get own timer ref in every component, and will NOT reset when component reexecutes (the value of ref is saved and not changewhen component reexecutes as weel as the conpoment NOT reexecutes when the valueof ref changes
    const dialog = useRef();

    if (timeRemaining <= 0){
        clearInterval(timer.current);
        dialog.current.open();  // open() - method is inside ResultModal and connected trought useImperativeHandle

    }
    const handleReset = () =>{
        setTimeRemaining(targetTime * 1000);
    };
    const handleStart = () => {
        timer.current = setInterval(() => {
            setTimeRemaining((prevTimeRemaining)=>{
                return prevTimeRemaining - 10;
            })

        }, targetTime * 10);

    };
    const handleStop = () => {

        clearInterval(timer.current);
        dialog.current.open();  // open() - method is inside ResultModal and connected trought useImperativeHandle
    };

    return (
      <>
          <ResultModal
                ref = {dialog}
                targetTime={targetTime}
                result="lost"
                remainingTime={timeRemaining}
                onReset = {handleReset}
          />

          <section className="challenge">
              <h2>
                  {title}
              </h2>
              <p className="challenge-time">
                  {targetTime} second{targetTime > 1 ? 's' : ''}
              </p>
              <p>
                  <button onClick={timerIsActive ? handleStop : handleStart}>
                      {timerIsActive ? 'Stop' : 'Start'}
                  </button>
              </p>
              <p className={timerIsActive ? 'active' : undefined}>
                  {timerIsActive ? 'Time running...' : 'Timer is not active'}
              </p>
          </section>
      </>
    );
};
export default TimerChallenge;
