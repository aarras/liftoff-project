import { FormatSizeRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import FormDataService from './services/FormService';
import { Link } from "react-router-dom";


const AddForm = () => {
    
    const initialFormState = {
        id: null,
        name: "",
    };

    const [form, setForm] = useState(initialFormState);
    const [submitted, setsubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const saveForm = () => {
        var data = {
            name: form.name
        };

        FormDataService.create(data)
            .then(response => {
                setForm({
                    id: response.data.id,
                    name: response.data.name
                });
                setsubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newForm = () => {
        setForm(initialFormState);
        setsubmitted(false);
    };

    const goToForms = () => {
        window.location.href = "/forms"
    }

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h5 className="mb-3">New form created successfully!</h5>
                    <button className="btn btn-primary mr-2" onClick={goToForms}>
                        View Forms
                    </button>
                    <button className="btn btn-secondary" onClick={newForm}>
                        Create Another
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Name your form:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={form.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>

                    <button onClick={saveForm} className="btn btn-primary">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddForm;