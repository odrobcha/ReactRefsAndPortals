import {forwardRef} from 'react';  //wrap the Component function with forwardRef to forwarded ref to component. And received ref, as the second parameter, after the props

const ResultModal = forwardRef(({result, targetTime}, ref) => {
    //The click on the button on the <form method="dialog"> inside <dialog> will close he dialog - built-in function


    return (
      <dialog className="result-modal" ref = {ref}>
            <h2>You {result}</h2>
          <p>The target time was <strong>{targetTime}</strong></p>
          <p>You stopped the timer with <strong>X seconds left.</strong></p>
          <form method="dialog">
              <button>
                  Close
              </button>

          </form>
      </dialog>
    );
});

export default ResultModal;
