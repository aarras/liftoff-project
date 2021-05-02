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
        const { name, value } = event.taget;
        setForm({ ...form, [name]: value });
    };

    const saveForm = () => {
        var data = {
            name: FormatSizeRounded.name
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

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-primary" onClick={newForm}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={form.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>

                    <botton onClick={saveForm} className="btn btn-primary">
                        Submit
                    </botton>
                </div>
            )}
        </div>
    );
};

export default AddForm;