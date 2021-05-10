import React, { useState, useEffect } from 'react';
import InputDataService from './services/InputService';
import { useParams } from "react-router-dom";
import CategoryDataService from "./services/CategoryService";


const AddInput = () => {
    const initialInputState = {
        id: null,
        name: "",
        category: null
    };

    const initialCategoryState = {
        id: null,
        name: "",
        inputType: null,
        form: null
    };
    
    const [currentCategory, setCurrentCategory] = useState(initialCategoryState);
    
    const [input, setInput] = useState(initialInputState);
    const [submitted, setsubmitted] = useState(false);

    // Form ID
    const { id } = useParams();

    const getCategory = id => {
        CategoryDataService.get(id)
        .then(response => {
            setCurrentCategory(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    useEffect(() => {
        getCategory(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    const saveInput = () => {
        var data = {
            label: input.name,
            category: currentCategory
        };

        InputDataService.create(data)
            .then(response => {
                setInput({
                    id: response.data.id,
                    label: response.data.name,
                    category: response.data.category
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

    const goToCategory = () => {
        window.location.href = "/category/" + id
    }

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h5 className="mb-3">New input created successfully!</h5>
                    <button className="btn btn-primary mr-2" onClick={goToCategory}>
                        Back to Category
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

                    <button onClick={saveInput} className="btn btn-primary mr-2">
                        Submit
                    </button>
                    <button onClick={goToCategory} className="btn btn-danger">
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddInput;