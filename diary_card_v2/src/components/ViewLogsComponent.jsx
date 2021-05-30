import React, { useState, useEffect } from "react";
import FormDataService from "./services/FormService";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-popup-alert';


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

    const setActiveForm = event => {
        const { name, value } = event.target;
        setCurrentForm(value);
        onShowAlert();
        console.log(event.target.value)
    };

    const onCloseAlert = () => {
        setAlert({
            type:'',
            text:'',
            show:false
        })
    }

    const onShowAlert = (text) => {
        setAlert({
            type:'success',
            text:text,
            show:true
        })
    }

    return (
        <div className="row">
            <DropdownButton id='1' title="Select A Form">
                {forms && forms.map((form) => (
                    <Dropdown.Item 
                        key={form.id}
                        eventKey={form.id}
                        onClick={setActiveForm}
                        value={form.name}
                    >
                        {form.name}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </div>
    );
};

export default ViewLogs;