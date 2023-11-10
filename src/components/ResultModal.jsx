import { forwardRef, useImperativeHandle, useRef } from 'react';  //wrap the Component function with forwardRef to forwarded ref to component. And received ref, as the second parameter, after the props
                // useImperativeHandle - use to define prop and methods that should be acceable from ouside of component

                //The click on the button on the <form method="dialog"> inside <dialog> will close he dialog - built-in function

import {createPortal} from 'react-dom'  //to use portal. To achive it wrapthe jsx code with createPortal, with the 1 -argument the jsxcode, , 2 the second - HTML element to wich this component should be teleported (in index.html document #modal)

const ResultModal = forwardRef(({ result, targetTime, remainingTime, onReset }, ref) => {
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {    // firs prop - is the ref (works together with forwardRef) , second - is the function that returns the object which groups all the props and methods, that should be exposed by this component (which will be callable from outside)
        return {
            open () {
                dialog.current.showModal(); //showModal() -standart built-in method to open dialog
            }
        };
    });

    return (createPortal(
      <dialog className="result-modal" ref={dialog} onClose={onReset}>
          {userLost && <h2>You lost</h2>}

          {!userLost && <h2>Your score: {score}</h2>}

          <p>The target time was <strong>{targetTime}</strong></p>
          <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
          <form method="dialog" onSubmit={onReset}>
              <button>
                  Close
              </button>

          </form>
      </dialog>,
      document.getElementById("modal")
    ));
});

export default ResultModal;
