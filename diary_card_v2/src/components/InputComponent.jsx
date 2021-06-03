import React, { useState, useEffect } from "react";
import InputDataService from "./services/InputService";
import InputResponseDataService from "./services/InputResponseService";
import { useParams } from 'react-router-dom';
import ComponentHeader from "./ComponentHeader"



const Input = ( { formSubmitted, dateSubmitted,
  currentInput, setCurrentInput, formState, setSuccess } ) => {

    const initialResponseState = {
      id: null,
      submissionDate: null,
      response: "",
      input: null
    }

    const [currentResponse, setCurrentResponse] = 
      useState(initialResponseState);
    const [input, setInput] = useState(null);
    //const [message, setMessage] = useState("");
    //const [submitted, setSubmitted] = useState(false);

    const { formId } = useParams();
    const { formName } = useParams();
    const { catId } = useParams();
    const { catName } = useParams();
    const { inputId } = useParams();
    const { inputLabel } = useParams();
    const { inputType } = useParams();

    useEffect(() => {
      setResponse();
    }, [currentInput]);

    useEffect(() => {
      handleSubmit();
    }, [formSubmitted]);
    
    // const chooseSource = () => {
    //   if (currentInput != null) {
    //     return currentInput;
    //   } else return inputId;
    // }

    // const getInput = source => {
    //     InputDataService.get(source)
    //     .then(response => {
    //       setInput(response.data);
    //       console.log(input);
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // };

    const setResponse = () => {
      setCurrentResponse({ ...currentResponse, input: currentInput })
    }
  
    // const updateInput = () => {
    //  InputDataService.update(currentInput.id, currentInput)
    //     .then(response => {
    //      console.log(response.data);
    //       setMessage("The input was updated successfully!");
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // };
  
    // const deleteInput = () => {
    //     InputDataService.remove(currentInput.id)
    //     .then(response => {
    //       console.log(response.data);
    //     window.location.href = "/inputs"
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // }; 

    const handleInputChange = event => {
      setCurrentResponse({
        ...currentResponse, response: event.target.value
      });
    };

    const handleSubmit = () => {
      
      if(formSubmitted) {

        var data = {
          response: currentResponse.response,
          submissionDate: dateSubmitted,
          input: currentResponse.input
        };

        InputResponseDataService.create(data)
          .then(response => {
            setCurrentResponse({
              id: response.data.id,
              response: response.data.response,
              submissionDate: response.data.date,
              input: response.data.input
            });
            console.log(response.data);
            setSuccess(true);
          })
          .catch(e => {
            console.log(e);
          });
      }
    }

    // const unavailable = (label) => {
    //   setMessage(label + " is unavailable at this time")
    // }
  
    // const goToInputs = () => {
    //   window.location.href = "/inputs"
    // }

    return (
        <div>
          {inputId &&
            <div>
              <ComponentHeader 
                componentName={inputLabel} 
                type="Input" 
                types="Inputs" 
                subType="Response" 
                subTypes="Responses" 
                formName={formName}
                formId={formId}
                catName={catName}
                catId={catId}
                componentId={inputId} 
                url="/inputs"
              />
            </div>
          }
          {currentInput
            ?<div className="row ml-1"> 
              <strong>{currentInput.label}</strong>
                  <input
                    type={currentInput.category.inputType}
                    className="form-control"
                    id={currentInput.id}
                    placeholder="Insert response here"
                    name={currentInput.label}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    form='theForm'
                  />
            </div>
            :<div className="row ml-1"> 
              <strong>{inputLabel}</strong>
                  <input
                    type={inputType}
                    className="form-control"
                    id={inputId}
                    placeholder="Insert response here"
                    name={inputLabel}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    form='theForm'
              />
            </div>
            }
        </div>
    );
};

export default Input;