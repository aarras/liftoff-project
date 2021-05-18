import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import FormDataService from "./services/FormService";
import CategoryDataService from "./services/CategoryService";
import InputDataService from "./services/InputService";
import Input from "./InputComponent";


const DisplayForm = () => {
    const initialFormState = {
      id: null,
      name: ""
    };

    const initialCategoryState = {
      id: null,
      name: "",
      inputType: null,
      form: null
    };

    const initialInputState = {
      id: null,
      label: "",
      category: null
    };

    const { id } = useParams();

    const [currentForm, setCurrentForm] = useState(initialFormState);
    const [message, setMessage] = useState("");
    const [task, setTask] = useState("");

    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(initialCategoryState);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(-1);

    const [inputs, setInputs] = useState([]);
    const [allInputs, setAllInputs] = useState([]);
    const [currentInput, setCurrentInput] = useState(initialInputState);
    const [currentInputIndex, setCurrentInputIndex] = useState(-1);

    const getForm = id => {
        FormDataService.get(id)
        .then(response => {
            setCurrentForm(response.data);
            console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    const retrieveCategoriesByForm = id => {
      CategoryDataService.getAllByForm(id)
        .then(response => {
          setCategories(response.data);
          console.log(response.data);
          retrieveInputsByCategory(response.data);
        })
        .catch(e => {
          console.log(e);
        });        
    };
 
    const retrieveInputsByCategory = (categories) => {
        for (let category of categories) {

            InputDataService.getAllByCategory(category.id)
                .then(response => {
                setInputs(response.data);
                setAllInputs(inputs);
                console.log(response.data);
                console.log(allInputs);
                })
                .catch(e => {
                console.log(e);
                });

        }
    };

    const listCategories = categories.map((category) => 
        <div className="container" key={category.id}>
            <div className="row mb-4  justify-content-center">
                <strong className="h4">----------{category.name}----------</strong>
            </div>
            <div>
                {inputs && inputs.map((input) => (
                    <div className="col-3 justify-content-center" key={input.id}>
                        <div className="mb-4 text-center">
                            <div className="row ml-1"> 
                                <strong>{input.label}</strong>
                                <input
                                    type={input.inputType}
                                    className="form-control"
                                    id={input.id}
                                    placeholder="Insert response here"
                                    name={input.label}
                                    // onChange={handleInputChange}
                                    // onSubmit={handleSubmit}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    useEffect(() => {
        getForm(id);
        retrieveCategoriesByForm(id);
    }, [id], [id]);

    return (
        <div>
            {listCategories}
        </div>

    );


};

export default DisplayForm;