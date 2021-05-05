import React, { useState, useEffect } from "react";
import FormDataService from "./services/FormService";
import { useParams } from 'react-router-dom';
import Editable from "./EditableComponent";
import FormFields from "./FormFieldsComponent";



const Form = () => {
    const initialFormState = {
      id: null,
      name: ""
    };

    const [currentForm, setCurrentForm] = useState(initialFormState);
    const [message, setMessage] = useState("");
    const [task, setTask] = useState("");


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

    useEffect(() => {
      getForm(id);
    }, [id]);
  
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
          console.log(response.data);
        window.location.href = "/forms"
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const goToForms = () => {
      window.location.href = "/forms"
    }

    return (
        <div>
            {currentForm ? (
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
                  <div className="row ml-1"> 
                    <button type="submit" className="badge badge-success mr-2" onClick={updateForm}>
                      Edit Form
                    </button>
                    <button className="badge badge-danger mr-2" onClick={deleteForm}>
                      Delete Form
                    </button>
                    <button className="badge badge-primary mr-2" onClick={goToForms}>
                      View All Forms
                    </button>
                    <br/>
                  </div>
                                  
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Form Name:</label>
                        <input
                            type="text"
                            className="form-control col-md-5"
                            id="name"
                            name="name"
                            value={currentForm.name}
                            onChange={handleInputChange}
                        />
                    </div>
                  {/* <FormFields /> */}
                </form>
               
                  

                <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please select a form.</p>
                </div>
            )}
        </div>
  );
};

  export default Form;