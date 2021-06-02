import React, { useState, useEffect } from "react";
import InputResponseDataService from "./services/InputResponseService";
import Table from 'react-bootstrap/Table';



const PullLogs = ({ currentForm, startDate, endDate }) => {

    const [logs, setLogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [dates, setDates] = useState([]);
    const [logsByDate, setLogsByDate] = useState({});

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
                    processLogs(response.data);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    const dateMe = (milliseconds) => {
        const newDate = new Date(1);
        return newDate.setMilliseconds(milliseconds);
    }

    const processLogs = (logs) => {
        var logCategories = [];
        var logDates = [];
        var logLabels = [];
        var getLogsByDate = [];
        let newObject = {};

        //break each key down and then add all keys at end.

        for(let i = 0; i < logs.length; i++) {
            var logDate = logs[i].submissionDate;
            var sexyLogDate = new Intl.DateTimeFormat('en-US', options).format(logDate)
            var log = logs[i];

            if(!logCategories.includes(logs[i].input.category.name)) {
                logCategories.push(logs[i].input.category.name);
            }

            if(!logDates.includes(sexyLogDate)) {
                var setDate = new Date(logs[i].submissionDate);
                var options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                }
                logDates.push(Intl.DateTimeFormat('en-US', options).format(setDate));
            }

            if(!logLabels.includes(logs[i].input.label)) {
                logLabels.push(logs[i].input.label);
            }

            if(!getLogsByDate.includes(logDate)) {
                getLogsByDate.push(logDate);
                Object.assign(newObject, {
                    [logDate]: []
                })
                setLogsByDate({ ...logsByDate, [logDate]: []})
            }

            newObject.[logDate].push(log);
        }

        setCategories(logCategories);
        setDates(logDates);
        setLogsByDate(newObject);
    }

    //Filter out logs that don't belong to this category
    const categorizeResponse = (category, date) => {
        var catLogs = [];
        
        for(let i = 0; i < logs.length; i++) { 
            if(logs[i].input.category.name === category) {
                catLogs.push(logs[i]);
            }
        }

        if(!date) {
            return catLogs;
        }

        return chronologizeLogs(catLogs, date);
    }

    //Filter out logs that weren't submitted on this date
    const chronologizeLogs = (catLogs, date) => {
        var dateLogs = [];

        for(let i = 0; i < catLogs.length; i++) {
            if(catLogs[i].submissionDate === date) {
                dateLogs.push(catLogs[i]);
            }
        }
        return dateLogs;
    }

    const fillFirstColumn = (category) => {
        
        const catLogs = categorizeResponse(category);
        const inputLabels = [];
        var logsByInput = {};
        const dashes = [];
        var count = 0;
        

        for(let i = 0; i < catLogs.length; i++) {
            dashes.push("-");
        }

        for(let i = 0; i < catLogs.length; i++){

            if(!inputLabels.includes(catLogs[i].input.label)) {
                inputLabels.push(catLogs[i].input.label);
            }
        }

        if(category != categories[0]) {
            Object.assign(logsByInput, {
                [category]: dashes
            })

        } else {
            Object.assign(logsByInput, {
                [category]: dates
            })
        }

        for(let i = 0; i < inputLabels.length; i++) {
            Object.assign(logsByInput, {
                [inputLabels[i]]: []
            })
        }

        for(let i = 0; i < catLogs.length; i++){
            var inputLabel = catLogs[i].input.label;
            logsByInput[inputLabel].push(catLogs[i]);
        }

        count++

        return (
            <>
                <tr>
                    <td key="21093482398" className="h5">
                        {category}
                    </td>
                    {logsByInput[category] && 
                    logsByInput[category].map((firstRow) => (
                        <td key={Math.random().toString(36).substr(2, 9)}>
                            {firstRow}
                        </td>
                    ))}
                </tr>
                {inputLabels && inputLabels.map((inputLabel) => (
                    <tr key={Math.random().toString(36).substr(2, 9)}>
                        <td>
                            {inputLabel}
                        </td>
                        {logsByInput[inputLabel] && 
                        logsByInput[inputLabel].map((log) => (
                            <td key={Math.random().toString(36).substr(2, 9)}>
                                {log.response}
                            </td>
                        ))}
                    </tr>
                ))}
            </>
        )
    }

    return (
        <div className="col-md-auto no-gutters">
            <Table width="300">
                {categories && categories.map((category) => (
                    <tbody key={Math.random().toString(36).substr(2, 9)}>
                        {fillFirstColumn(category)}
                    </tbody>
                ))}
            </Table>
        </div>
    );
};

export default PullLogs;