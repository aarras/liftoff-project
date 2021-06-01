import React, { useState, useEffect } from "react";
import InputResponseDataService from "./services/InputResponseService";
import Table from 'react-bootstrap/Table';



const PullLogs = ({ currentForm, startDate, endDate }) => {

    const [logs, setLogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [dates, setDates] = useState([]);
    const [inputLabels, setInputLabels] = useState([]);
    const [inputsByCategory, setInputsByCategory] = useState({});
    const [logsByDate, setLogsByDate] = useState({});
    const [categoryCount, setCategoryCount] = useState({});
    const [catDone, setCatDone] = useState(false);

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
        var getInputsByCat = {};
        let newObject = {};
        let catCount = {};


        for(let i = 0; i < logs.length; i++) {
            var logDate = logs[i].submissionDate;
            var catName = logs[i].input.category.name;
            var log = logs[i];

            if(!catCount[catName]) {
                Object.assign(catCount, {
                    [catName]: 0
                })
            }

            catCount[catName]++;

            if(!logCategories.includes(logs[i].input.category.name)) {
                logCategories.push(logs[i].input.category.name);
            }

            if(!logDates.includes(logs[i].submissionDate)) {
                logDates.push(logs[i].submissionDate);
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

            if(!getInputsByCat[catName]) {
                Object.assign(getInputsByCat, {
                    [catName]: []
                })
            }
            getInputsByCat[catName].push(logs[i].input);


            newObject.[logDate].push(log);
        }
        setCategories(logCategories);
        setDates(logDates);
        setInputLabels(logLabels);
        setLogsByDate(newObject);
        setCategoryCount(catCount);
        setInputsByCategory(getInputsByCat);
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

    //Filter out specific date logs that don't belong to the category
    const categorizeByDate = (category, date) => {
        const logsByOneDate = logsByDate[date];
        var catDateLogs = [];

        for(let i = 0; i < logsByOneDate.length; i++) {
            if(logsByOneDate[i].input.category.name === category) {
                catDateLogs.push(logsByOneDate[i]);
            }
        }
        return catDateLogs;
    }

    const byDateAndInput = (sentLabel) => {
        const logsByInput = [];
        
        for (let i = 0; i < logs.length; i++) {

            if(logs[i].input.label === sentLabel) {
                logsByInput.push(logs[i].response);
            }
        }
        return logsByInput;
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

        for(let i = 0; i < catLogs.length; i++){
            if(!inputLabels.includes(catLogs[i].input.label)) {
                inputLabels.push(catLogs[i].input.label);
            }
        }

        return (
            <>
                {inputLabels.map((inputLabel) => (
                <tr key={inputLabels.index}>
                    <td key={inputLabels.index}>{inputLabel}</td>
                </tr>
                ))}
            </>
        )
    }

    const addBlanks = () => {
        
        if(catDone) {
            return <td>-</td>
        }
    }

    const fillTable = (inputLabel) => {
        const getByDateAndLabel = byDateAndInput(inputLabel);
        console.log(inputsByCategory);

        return (
            <>
                {getByDateAndLabel && getByDateAndLabel.map((inputLabel) => (
                    <td key={inputLabel.index}>
                        {inputLabel}
                    </td>
                ))}
                {addBlanks()}
            </>
        )
    }

    return (
        <div className="container no-gutters">
            <div className="row no-gutters">
                <div className="col-md-auto no-gutters">
                    <Table responsive>
                        {categories && categories.map((category) => (
                            <>
                                <tbody>
                                        <tr>
                                            <td key={category.index} 
                                                className="h5"
                                            >
                                                {category}
                                            </td>
                                            
                                        </tr>
                                    {fillFirstColumn(category)}
                                </tbody>
                            </>
                        ))}
                    </Table>
                </div>
                <div className="col-md-auto no-gutters">
                    <Table responsive>
                        <thead>
                            <tr>
                                {dates && dates.map((date) => (
                                    <th key={date.index}>{date}</th>
                                ))}
                            </tr>
                        </thead>
                            <tbody>
                                {inputLabels && inputLabels.map((inputLabel) => (
                                    <>
                                        <tr key={inputLabel.index}>
                                            {fillTable(inputLabel)}
                                        </tr>
                                    </>
                                ))}
                                
                            </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default PullLogs;