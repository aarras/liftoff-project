import React, { useState, useEffect } from "react";
import InputDataService from "./services/InputService";
import { Link } from "react-router-dom";

const InputList = () => {
    const [inputs, setInputs] = useState([]);
    const [currentInput, setCurrentInput] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchLabel, setSearchLabel] = useState("");

    useEffect(() => {
        retrieveInputs();
    }, []);

    const onChangeSearchLabel = e => {
        const searchLabel = e.target.value;
        setSearchLabel(searchLabel);
    };

    const retrieveInputs = () => {
        InputDataService.getAll()
            .then(response => {
                setInputs(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveInputs();
        setCurrentInput(null);
        setCurrentIndex(-1);
    };

    const setActiveInput = (input, index) => {
        setCurrentInput(input);
        setCurrentIndex(index);
    };

    const removeAllInputs = () => {
        InputDataService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByLabel = () => {
        InputDataService.findByLabel(searchLabel)
            .then(response => {
                setInputs(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const addInput = () => {
        window.location.href = "/inputs/add"
    }

    return (
        <div className=".container">
            <div className="list row col-md-5">
                <div className="input-group mb-3">
                    <input  
                        type="text"
                        className="form-control"
                        placeholder="Search by Label"
                        value={searchLabel}
                        onChange={onChangeSearchLabel}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByLabel}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="list row ml-2 mt-3 mb-2">
                <h5 className="mr-4">Select an Input</h5>
                <button className="badge badge-primary mr-2" onClick={addInput}>
                    Create New Input
                </button>
            </div>
            <div className="list row col-md-5">
                <ul className="list-group">
                    {inputs &&
                        inputs.map((input, index) => (
                            <li
                                className={
                                    "list-group-item list-group-item-action" + (index === currentIndex ? " active" : "")
                                }
                                onClick={() => setActiveInput(input, index)}
                                key={index}
                            >
                                {input.label} {index === currentIndex ? 
                                <Link
                                to={"/input/" + currentInput.id}
                                className="badge badge-warning ml-3"
                            >
                                View Input
                            </Link> : ""}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default InputList;