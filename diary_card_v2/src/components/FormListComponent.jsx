import React, { useState, useEffect } from "react";
import FormDataService from "./services/FormService";
import { Link } from "react-router-dom";

const FormList = () => {
    const [forms, setForms] = useState([]);
    const [currentForm, setCurrentForm] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrieveForms();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveForms = () => {
        FormDataService.getAll()
            .then(response => {
                setForms(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveForms();
        setCurrentForm(null);
        setCurrentIndex(-1);
    };

    const setActiveForm = (form, index) => {
        setCurrentForm(form);
        setCurrentIndex(index);
    };

    const removeAllForms = () => {
        FormDataService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        FormDataService.findByName(searchName)
            .then(response => {
                setForms(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className=".container">
            <div className="list row col-md-5">
                <div className="input-group mb-3">
                    <input  
                        type="text"
                        className="form-control"
                        placeholder="Search by Name"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="list row ml-2 mt-3 mb-2">
                <h5>Select a form</h5>
            </div>
            <div className="list row col-md-5">
                <ul className="list-group">
                    {forms &&
                        forms.map((form, index) => (
                            <li
                                className={
                                    "list-group-item list-group-item-action" + (index === currentIndex ? " active" : "")
                                }
                                onClick={() => setActiveForm(form, index)}
                                key={index}
                            >
                                {form.name} {index === currentIndex ? 
                                <Link
                                to={"/form/" + currentForm.id}
                                className="badge badge-warning ml-3"
                            >
                                View Form
                            </Link> : ""}
                            </li>
                        ))}
                </ul>
            </div>
            {/* <div className="col-md-6">
                {currentForm ? (
                    <div>
                        <h4>Form</h4>
                    <div>
                        <label>
                            <strong>Name:</strong>
                        </label>{" "}
                        {currentForm.name}
                    </div>
                    
                    <Link
                        to={"/form/" + currentForm.id}
                        className="badge badge-primary"
                    >
                        View Form
                    </Link>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Select a form</p>
                </div>
                )}
            </div> */}
        </div>
    );
};

export default FormList;