import React, { useState, useEffect } from 'react';
import InputDataService from './services/InputService';
import { useParams } from "react-router-dom";
import FormDataService from "./services/FormService";



const AddInput = () => {
    const initialInputState = {
        id: null,
        name: "",
        type: null,
        form: null
    };

    const initialFormState = {
        id: null,
        name: ""
    };
    
    const [currentForm, setCurrentForm] = useState(initialFormState);
    
    const [input, setInput] = useState(initialInputState);
    const [submitted, setsubmitted] = useState(false);

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

    useEffect(() => {
        getForm(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    const saveInput = () => {
        var data = {
            label: input.name,
            type: null,
            form: currentForm
        };

        InputDataService.create(data)
            .then(response => {
                setInput({
                    id: response.data.id,
                    label: response.data.name,
                    form: response.data.form
                });
                setsubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newInput = () => {
        setInput(initialInputState);
        setsubmitted(false);
    };

    const goToInputs = () => {
        window.location.href = "/inputs"
    }

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h5 className="mb-3">New input created successfully!</h5>
                    <button className="btn btn-primary mr-2" onClick={goToInputs}>
                        View Input
                    </button>
                    <button className="btn btn-secondary" onClick={newInput}>
                        Create Another
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Name your input:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={input.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>

                    <button onClick={saveInput} className="btn btn-primary">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddInput;