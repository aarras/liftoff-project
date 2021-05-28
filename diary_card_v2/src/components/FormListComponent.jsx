import React, { useState, useEffect } from "react";
import FormDataService from "./services/FormService";
import { Link } from "react-router-dom";
import urlMe from "./services/urlMe";


const FormList = () => {
    const [forms, setForms] = useState([]);
    const [currentForm, setCurrentForm] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrieveForms();
    }, []);

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

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
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

    const addForm = () => {
        window.location.href = urlMe("/form/add")
    }

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
                <h5 className="mr-4">Select a form</h5>
                <button className="badge badge-primary mr-2" onClick={addForm}>
                    Create New Form
                </button>
            </div>
            <div className="list row col-md-5">
                <ul className="list-group">
                    {forms &&
                        forms.map((form, index) => (
                            <li
                                className={
                                    "list-group-item list-group-item-action" + 
                                    (index === currentIndex ? " active" : "")
                                }
                                onClick={() => setActiveForm(form, index)}
                                key={index}
                            >
                                {form.name} {index === currentIndex ? 
                                <Link
                                    to={urlMe("/" + 
                                        currentForm.name + "/" + 
                                        currentForm.id + "/"
                                    )}
                                    className="badge badge-warning ml-3"
                                >
                                View Form
                            </Link> : ""}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default FormList;