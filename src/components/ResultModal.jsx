import { forwardRef, useImperativeHandle, useRef } from 'react';  //wrap the Component function with forwardRef to forwarded ref to component. And received ref, as the second parameter, after the props
// useImperativeHandle - use to define prop and methods that should be acceable from ouside of component

//The click on the button on the <form method="dialog"> inside <dialog> will close he dialog - built-in function
const ResultModal = forwardRef(({ result, targetTime }, ref) => {
    const dialog = useRef();

    useImperativeHandle(ref, () => {    // firs prop - is the ref (works together with forwardRef) , second - is the function that returns the object which groups all the props and methods, that should be exposed by this component (which will be callable from outside)
        return {
            open () {
                dialog.current.showModal(); //showModal() -standart built-in method to open dialog
            }
        };
    });

    return (
      <dialog className="result-modal" ref={dialog}>
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
