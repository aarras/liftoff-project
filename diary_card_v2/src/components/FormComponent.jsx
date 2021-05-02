import React, { useState, useEffect } from "react";
import FormDataService from "./services/FormService";

const Form = props => {
    const initialFormState = {
      id: null,
      name: ""
    };
    const [currentForm, setCurrentForm] = useState(initialFormState);
    const [message, setMessage] = useState("");
  
    const getForm = id => {
      FormDataService.get(id)
        .then(response => {
          setCurrentForm(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    useEffect(() => {
      getForm(props.match.params.id);
    }, [props.match.params.id]);
  
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
          props.history.push("/forms");
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    return (
        <div>
            {currentForm ? (
                <div className="edit-form">
                <h4>Form</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={currentForm.name}
                            onChange={handleInputChange}
                        />
                    </div>
                </form>
                    
                    <button className="badge badge-danger mr-2" onClick={deleteForm}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateForm}
                    >
                        Update
                    </button>
                <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Form...</p>
                </div>
            )}
        </div>
  );
};

  export default Form;