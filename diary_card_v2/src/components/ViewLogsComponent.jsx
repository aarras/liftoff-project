import React, { useState, useEffect } from "react";
import FormDataService from "./services/FormService";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import OneLog from "./OneLogComponent";


const ViewLogs = () => {

    const initialErrorState = {
        type:'error',
        text:'Does not compute!',
        show:false
    }

    const [forms, setForms] = useState([]);
    const [currentForm, setCurrentForm] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [alert, setAlert] = useState(initialErrorState);

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

    const getForm = id => {
        FormDataService.get(id)
        .then(response => {
            setCurrentForm(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    const setActiveForm = event => {
        getForm(event.target.id);
    };

    return (
        <div>
            <div className="row no-gutters" name="options">
                <DropdownButton id='1' title="Select A Form">
                    {forms && forms.map((form) => (
                        <Dropdown.Item 
                            id={form.id}
                            key={form.id}
                            onClick={setActiveForm}
                        >
                            {form.name}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </div>
            <div className="container no-gutters">
                <div className="row no-gutters mt-5 justify-content-center">
                    {currentForm
                        ?<div name="responses">
                            <OneLog currentForm={currentForm} />
                        </div>
                        :<div>
                            <h4 className="">Select a form and date range to display.</h4>
                        </div>
                    }
                </div>
            </div>
        </div>

    );
};

export default ViewLogs;