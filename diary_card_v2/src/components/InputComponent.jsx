import React, { useState, useEffect } from "react";
import InputDataService from "./services/InputService";
import { useParams } from 'react-router-dom';
import Editable from "./EditableComponent";


const Input = () => {
    const initialInputState = {
      id: null,
      label: "",
      type: null,
      form: null
    };

    const [currentInput, setCurrentInput] = useState(initialInputState);
    const [message, setMessage] = useState("");
    const [task, setTask] = useState("");

    const { id } = useParams();
  
    const getInput = id => {
        InputDataService.get(id)
        .then(response => {
            setCurrentInput(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    useEffect(() => {
      getInput(id);
    }, [id]);
  
    const handleInputChange = event => {
      const { label, value } = event.target;
      setCurrentInput({ ...currentInput, [label]: value });
    };
    
    const updateInput = () => {
     InputDataService.update(currentInput.id, currentInput)
        .then(response => {
         console.log(response.data);
          setMessage("The input was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const deleteInput = () => {
        InputDataService.remove(currentInput.id)
        .then(response => {
          console.log(response.data);
        window.location.href = "/inputs"
        })
        .catch(e => {
          console.log(e);
        });
    };

    const unavailable = (label) => {
      setMessage(label + " is unavailable at this time")
    }
  
    const goToInputs = () => {
      window.location.href = "/inputs"
    }

    return (
        <div>
            {currentInput ? (
                <div className="edit-form">
                  <Editable
                    text={task}
                    placeholder={currentInput.label}
                    type="input"
                    className="h4"
                  >
                    <div className="row ml-1">
                      <input
                        type="text"
                        name="name"
                        placeholder={currentInput.label}
                        value={currentInput.label}
                        onChange={handleInputChange}
                        onBlur={updateInput}
                        className="mr-2 form-control-lg"
                      />
                      <button type="submit" className="badge badge-success mr-2" onClick={() => updateInput}>
                        Update Label
                      </button>
                      <button className="badge badge-danger mr-2" onClick={e => e.target.blur()}>
                        Cancel
                    </button>
                    </div>
                  </Editable>
                  <div className="row ml-1"> 
                    <button type="submit" className="badge badge-success mr-2" onClick={() => unavailable("Edit Input")}>
                      Edit Input
                    </button>
                    <button className="badge badge-danger mr-2" onClick={deleteInput}>
                      Delete Input
                    </button>
                    <button className="badge badge-primary mr-2" onClick={goToInputs}>
                      View All Inputs
                    </button>
                    <br/>
                  </div>          
                  <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please select an input.</p>
                </div>
            )}
        </div>
    );
};

export default Input;