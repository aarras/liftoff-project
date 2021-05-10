import React, { useState, useEffect } from "react";
import FormDataService from "./services/FormService";
import CategoryDataService from "./services/CategoryService";
import InputDataService from "./services/InputService";
import { useParams, Link } from 'react-router-dom';
import Editable from "./EditableComponent";


const Form = () => {
    const initialFormState = {
      id: null,
      name: ""
    };

    const [currentForm, setCurrentForm] = useState(initialFormState);
    const [message, setMessage] = useState("");
    const [task, setTask] = useState("");

    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(-1);

    const [inputs, setInputs] = useState([]);
    const [inputsByCategory, setInputsByCategory] = useState([]);
    const [currentInput, setCurrentInput] = useState(null);
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
          setCategories(response.data);
          retrieveAllInputs();
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });        
    };

    const retrieveInputsByCategory = id => {
      console.log("HELP");
      InputDataService.getAllByCategory(id)
        .then(response => {
          setInputs(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    const retrieveAllInputs = () => {
      InputDataService.getAll()
        .then(response => {
          setInputs(response.data);
          console.log(response.data);
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
      retrieveAllInputs();
    }, [id], [id], []);

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

    const unavailable = (name) => {
      setMessage(name + " is unavailable at this time")
    }
  
    const goToForms = () => {
      window.location.href = "/forms"
    }

    return (
        <div>
          <div className="edit-form">
            <Editable
              text={task}
              placeholder={currentForm.name}
              type="input"
              className="h4"
            >
              <div className="row ml-1">
                <input
                  type="text"
                  name="name"
                  placeholder={currentForm.name}
                  value={currentForm.name}
                  onChange={handleInputChange}
                  onBlur={updateForm}
                  className="mr-2 form-control-lg"
                />
                <button type="submit" className="badge badge-success mr-2" onClick={updateForm}>
                  Update Name
                </button>
                <button className="badge badge-danger mr-2" onClick={e => e.target.blur()}>
                  Cancel
              </button>
              </div>
            </Editable>
            <div className="row ml-1 mb-5"> 
              <Link to={"/form/" + currentForm.id + "/category/add"}>
                <button className="badge badge-warning mr-2">
                  Add Category
                </button>
              </Link>
              <Link to={"/forms/"}>
                <button className="badge badge-primary mr-2">
                  View All Forms
                </button>
              </Link>
              <br/>
            </div>          
            <p>{message}</p>
            <div>
            <ul className="list-group">
              <div className="container no-gutters">
                {categories && categories.map((category) => (
                  <div className="row justify-content-center">
                    <strong className="h4" key={category.id}>----------{category.name}----------</strong>
                      <div className="row">
                        {retrieveInputsByCategory(category.id)}     
                          {inputs && inputs.map((input) => (
                            <div className="col-4 mb-3">
                              <strong>{input.label}</strong>
                              <input
                              type={category.inputType}
                              className="form-control"
                              id={input.label}
                              placeholder="Response"
                              name={input.label}
                              ></input>
                            </div>
                          ))}
                      </div>
                  </div>
                ))}
              </div>
            </ul>
          </div>
        </div> 
      </div>
  );
};

  export default Form;