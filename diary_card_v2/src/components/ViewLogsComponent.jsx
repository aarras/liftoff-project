import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormDataService from "./services/FormService";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import PullLogs from "./PullLogsComponent";


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
    const [startDate, setStartDate] = useState(new Date().getTime());
    const [endDate, setEndDate] = useState(new Date().getTime());

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
                <div className="col-md-auto align-self-end">
                    <DropdownButton className="mr-3" id='1' title="Select A Form">
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
                <div className="col-md-auto no-gutters">
                    <p className="mb-0">Start Date</p>
                    <DatePicker 
                        className="mr-3"
                        selected={startDate}
                        onChange={(date) => setStartDate(date.getTime())}
                    />
                </div>
                <div className="col-md-auto no-gutters">
                    <p className="mb-0">End Date</p>
                    <DatePicker 
                        className="mr-3"
                        selected={endDate}
                        onChange={(date) => setEndDate(date.getTime())}
                    />
                </div>
            </div>
            <div className="container no-gutters">
                <div className="row mt-5">
                    {currentForm
                        ?<div name="responses">
                            <PullLogs
                                currentForm={currentForm}
                                startDate={startDate}
                                endDate={endDate}
                            />
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