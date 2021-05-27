import React, { useState, useEffect } from 'react';
import CategoryDataService from './services/CategoryService';
import { useParams } from "react-router-dom";
import FormDataService from "./services/FormService";
import Category from './CategoryComponent';
import PropTypes from "prop-types";


const AddCategory = (onSubmit) => {
    const initialCategoryState = {
        id: null,
        name: "",
        inputType: "",
        order: null,
        form: null,
        nameError: "",
        inputTypeError: ""
    };

    const initialFormState = {
        id: null,
        name: ""
    };
    
    const [currentForm, setCurrentForm] = useState(initialFormState);
    
    const [category, setCategory] = useState(initialCategoryState);
    const [submitted, setsubmitted] = useState(false);

    // Form ID
    const { formId } = useParams();

    Category.propTypes = {
        onSubmit: PropTypes.func
    };

    const getForm = formId => {
        FormDataService.get(formId)
        .then(response => {
            setCurrentForm(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    useEffect(() => {
        getForm(formId);
    }, [formId]);

    const handleCategoryChange = event => {
        const { name, value } = event.target;
        setCategory({ ...category, [name]: value });
    };

    const validate = () => {
        let nameError = "";
        let inputTypeError = "";

        if (!category.name) {
            nameError = "Category name is required."
        }

        if (!category.inputType) {
            inputTypeError = "You must select an input type."
        }

        if (nameError || inputTypeError) {
            setCategory.nameError = nameError;
            setCategory.inputTypeError = inputTypeError;
            return false;
        }
        return true;
    }

    const saveCategory = () => {
        
        const isValid = validate();

        setCategory.nameError = "";
        setCategory.inputTypeError = "";

        if (isValid) {

            var data = {
                name: category.name,
                inputType: category.inputType,
                order: null,
                form: currentForm
            };

            CategoryDataService.create(data)
                .then(response => {
                    setCategory({
                        id: response.data.id,
                        name: response.data.name,
                        inputType: response.data.inputType,
                        order: response.data.order,
                        form: response.data.form
                    });
                    setsubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    const newCategory = () => {
        setCategory(initialCategoryState);
        setsubmitted(false);
    };

    const goToForm = () => {
        window.location.href = "/form/" + formId
    }

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h5 className="mb-3">New category created successfully!</h5>
                    <button className="btn btn-primary mr-2" onClick={goToForm}>
                        Back to Form
                    </button>
                    <button className="btn btn-secondary" onClick={newCategory}>
                        Create Another
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="name">Name your category:
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    required
                                    value={category.name}
                                    onChange={handleCategoryChange}
                                    name="name"
                                />
                                <div className="small" style={{color: "red"}}>{category.nameError}</div>
                            </label>
                        </div>
                        <div className="row">
                        <label>What type of input will this category hold?
                            <select
                                type="select"
                                className="form-control"
                                id="inputType"
                                required
                                value={category.inputType}
                                name="inputType"
                                onChange={handleCategoryChange}
                            >
                                <option value="" disabled hidden>Pick One</option>
                                <option value="checkbox">Checkbox</option>
                                <option value="select">Select One</option>
                                <option value="selectMultiple">Select Multiple</option>
                                <option value="text">Text(short)</option>
                                <option value="textarea">Text Box</option>
                            </select>
                            <div className="small" style={{color: "red"}}>{category.inputTypeError}</div>
                        </label>
                        </div>
                    </div>

                    <button onClick={saveCategory} className="btn btn-primary">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddCategory;