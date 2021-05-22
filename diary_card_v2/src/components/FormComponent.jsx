import React, { useState, useEffect } from "react";
import FormDataService from "./services/FormService";
import CategoryDataService from "./services/CategoryService";
import InputDataService from "./services/InputService";
import { useParams } from 'react-router-dom';
import Category from "./CategoryComponent";
import ComponentHeader from "./ComponentHeader"
import DisplayForm from "./DisplayFormComponent"


const Form = () => {
    const initialFormState = {
      id: null,
      name: ""
    };

    const initialCategoryState = {
      id: null,
      name: "",
      inputType: null,
      form: null
    };

    const initialInputState = {
      id: null,
      label: "",
      category: null
    };

    const initialResponseState = {
      inputResponses: [ { 
        responseId: null, 
        submissionDate: null, 
        response: "",
        input: {
          inputId: null,
          label: "",
          category: {
            categoryId: null,
            name: "",
            inputType: null,
          }
        } 
      } ]
    }

    const initialState = ( [{
        categoryId: null,
        categoryName: "",
        inputType: null,
        inputs: [{
          inputId: null,
          inputLabel: "",
          response: {
            responseId: null,
            submissionDate: null,
            response: ""
          }
        }]
    }] )

    const [state, setState] = useState(initialState);

    const [currentForm, setCurrentForm] = useState(initialFormState);
    const [message, setMessage] = useState("");
    const [task, setTask] = useState("");

    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(initialCategoryState);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(-1);

    const [inputs, setInputs] = useState([]);
    const [currentInput, setCurrentInput] = useState(initialInputState);
    const [currentInputIndex, setCurrentInputIndex] = useState(-1);

    // Form ID
    const { id } = useParams();
  
    const getForm = id => {
        FormDataService.get(id)
        .then(response => {
            setCurrentForm(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    const retrieveCategoriesByForm = id => {
      CategoryDataService.getAllByForm(id)
        .then(response => {
          setState(response.data);
          setCategories(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });        
    };
 
    const retrieveInputsByCategory = () => {
      InputDataService.getAllByCategory(id)
        .then(response => {
          setInputs(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    const setActiveCategory = (category, index) => {
      setCurrentCategory(category);
      setCurrentCategoryIndex(index);
    }

    const setActiveInput = (input, index) => {
      setCurrentInput(input);
      setCurrentInputIndex(index);
    };

    const refreshList = (id) => {
      retrieveCategoriesByForm(id);
    }

    useEffect(() => {
      getForm(id);
      retrieveCategoriesByForm(id);

    }, [], []);

    const handleInputChange = event => {
      const { name, value } = event.target;
      setCurrentForm({ ...currentForm, [name]: value });
    };
    
    const updateForm = () => {
     FormDataService.update(currentForm.id, currentForm)
        .then(response => {
         console.log(response.data);
          setMessage("The form was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const deleteForm = () => {
        FormDataService.remove(currentForm.id)
        .then(response => {
        window.location.href = "/forms"
        })
        .catch(e => {
          console.log(e);
        });
    };

    const submitForm = (event) => {
      console.log(event)
    }

    const unavailable = (name) => {
      setMessage(name + " is unavailable at this time")
    }
  
    const goToForms = () => {
      window.location.href = "/forms"
    }


    return (
        <div>
          <ComponentHeader componentName={currentForm.name} type="Form" types="Forms" subType="Category" subTypes="Categories" componentId={currentForm.id} url="forms" />
            {/* <div>
              <DisplayForm />
            </div> */}
            <div>
              {categories && categories.map((category) => (
                <div className="container" key={category.id}>
                  <div className="row mb-4  justify-content-center">
                    <strong className="h4">----------{category.name}----------</strong>
                  </div>
                  <Category state={state[state.indexOf(category.name)]} setState={newState => setState({ ...state[state], [category.name]: newState })} value={category.id} />
                </div>
              ))}
          </div>
          <button className="btn btn-primary" form='formInput' content='Submit' value='Submit' onClick={submitForm}>
              Submit Form
          </button> 
      </div>
  );
};

export default Form;