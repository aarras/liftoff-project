import React, { useState, useEffect } from "react";
import InputResponseDataService from "./services/InputResponseService";
import Table from 'react-bootstrap/Table';



const PullLogs = ({ currentForm, startDate, endDate }) => {

    const [logs, setLogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [responseByCategory, setResponseByCategory] = useState([])

    useEffect(() => {
        retrieveAllByDateBetween(startDate, endDate);
    }, [startDate, endDate]);

    const retrieveAllByDateBetween = () => {

        if(currentForm) {

            InputResponseDataService.getAllBetweenDates(currentForm.id, 
                                                        startDate, 
                                                        endDate)
                .then(response => {
                    setLogs(response.data);
                    getCategoriesFromLogs(response.data);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    const getCategoriesFromLogs = (logs) => {
        var logCategories = [];

        for(let i = 0; i < logs.length; i++) {
            if(!logCategories.includes(logs[i].input.category.name)) {
                logCategories.push(logs[i].input.category.name);
            }
        }
        setCategories(logCategories);
    }

    const dateMe = (milliseconds) => {
        const newDate = new Date(1);
        return newDate.setMilliseconds(milliseconds);
    }

    const categorizeResponse = (category) => {
        var catLogs = [];
        
        for(let i = 0; i < logs.length; i++) { 
            if(logs[i].input.category.name === category) {
                catLogs.push(logs[i]);
            }
            console.log(catLogs);   
        }
        return catLogs;
    }

    const fillFirstColumn = (category) => {
        
        const catLogs = categorizeResponse(category);

        return (
            <>
                {catLogs.map((catLog) => (
                <tr key={logs.index}>
                    <td key={catLog.index}>{catLog.input.label}</td>
                </tr>
                ))}
            </>
        )
    }

    const fillTable = (category) => {

        const catLogs = categorizeResponse(category);

        return (
            <>
                {catLogs.map((catLog) => (
                <tr key={logs.index}>
                    <td key={catLog.index}>{catLog.response}</td>
                </tr>
                ))}
            </>
        )
    }

    return (
        <div className="container no-gutters">
            <div className="row no-gutters">
                <div className="col-md-auto no-gutters">
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Input Name</th>
                            </tr>
                        </thead>
                        {categories && categories.map((category) => (
                            <tbody>
                                <tr>
                                    <td key={category.index} className="h5">{category}</td>
                                </tr>
                                {fillFirstColumn(category)}
                            </tbody>
                        ))}
                    </Table>
                </div>
                <div className="col-md-auto no-gutters">
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Date</th>
                            </tr>
                        </thead>
                        {categories && categories.map((category) => (
                            <tbody>
                                <tr>
                                    <td key={category.index} className="h5">------------</td>
                                </tr>
                                {fillTable(category)}
                            </tbody>
                        ))}
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default PullLogs;