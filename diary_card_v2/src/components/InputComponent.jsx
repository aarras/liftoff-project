import React, { useState, useEffect } from "react";
import InputDataService from "./services/InputService";
import InputResponseDataService from "./services/InputResponseService";
import { useParams } from 'react-router-dom';
import ComponentHeader from "./ComponentHeader"


const Input = ( {value, inputState, setInputState} ) => {
    const initialCategoryState = {
      id: null,
      name: "",
      inputType: "",
      form: null
    }  

    const initialInputState = {
      id: null,
      label: "",
      category: null
    };

    const initialResponseState = {
      id: null,
      submissionDate: null,
      response: "",
      input: null
    }

    const [currentCategory, setCurrentCategory] = useState(initialCategoryState);

    const [currentInput, setCurrentInput] = useState(initialInputState);
    const [message, setMessage] = useState("");
    const [task, setTask] = useState("");

    const [currentResponse, setCurrentResponse] = useState(initialResponseState);
    const [responses, setResponses] = useState([]);
    const [submitted, setsubmitted] = useState(false);

    // Input ID
    const { id } = useParams();

    const getInput = source => {
        InputDataService.get(source)
        .then(response => {
          //console.log(state);
          setCurrentInput(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    const chooseSource = () => {
      let sentInputId = value;
      let inputId = id;

      if (sentInputId != null) {
        return sentInputId;
      } else return inputId;
    }

    useEffect(() => {
      getInput(chooseSource());
    }, [chooseSource()]);
  
    const handleInputChange = event => {
      const { value } = event.target;
      setCurrentResponse({ ...currentResponse, response: value });
      console.log(currentResponse);
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

    const handleSubmit = (event) => {
      event.preventDefault();

      var dateInMilliSeconds = new Date().getTime();

      var data = {
        response: currentResponse.response,
        submissionDate: dateInMilliSeconds,
        input: currentInput
      };

      console.log(data);

      InputResponseDataService.create(data)
        .then(response => {
          setCurrentResponse({
            id: response.data.id,
            response: response.data.response,
            submissionDate: response.data.date,
            input: response.data.input
          });
          setsubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    const unavailable = (label) => {
      setMessage(label + " is unavailable at this time")
      setInputState(1);
      console.log(inputState);
      console.log();
    }
  
    const goToInputs = () => {
      window.location.href = "/inputs"
    }

    const testConsole = () => {
      console.log(currentInput);
    }

    return (
        <div>
          {!value &&
            <div>
              <ComponentHeader componentName={currentInput.label} type="Input" types="Inputs" subType="Response" subTypes="Responses" componentId={currentInput.id} url="/inputs" />
            </div>
          }
          <form id="formInput" onSubmit={handleSubmit}>
            <div className="row ml-1"> 
              <strong>{currentInput.label}</strong>
              <input
                type={currentCategory.inputType}
                className="form-control"
                id={currentInput.id}
                placeholder="Insert response here"
                name={currentInput.label}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
              />
            </div>  
          </form>
          <div>
            <button className="btn btn-success" onClick={unavailable} />
          </div>       
        </div>
    );
};

export default Input;