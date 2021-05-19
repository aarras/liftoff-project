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
      form: null,
      catInputs: []
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

    const [currentCategory, setCurrentCategory] = useState(initialCategoryState);
    const [categories, setCategories] = useState([]);
    const [categoriesWithInputs, setCategoriesWithInputs] = useState([]);
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
        })
        .then(data => { retrieveInputsByCategory(categories) })
        .catch(e => {
          console.log(e);
        });        
    };
 
    const retrieveInputsByCategory = (categories) => {
        let categoriezWithInputs = [];
        
        for (let oneCategory of categories) {
            
            let categoryz = initialCategoryState;
            
            InputDataService.getAllByCategory(oneCategory.id)
                .then(response => {
                    categoryz = {
                        id: oneCategory.id,
                        name: oneCategory.name,
                        inputType: oneCategory.inputType,
                        form: oneCategory.form,
                        catInputs: response.data
                    }

                    categoriezWithInputs.push(categoryz);
                          
                    setCategoriesWithInputs(categoriesWithInputs => 
                        [...categoriesWithInputs, categoriezWithInputs]);
                        console.log(categoryz);
                })
                .catch(e => {
                console.log(e);
                });
        }

        console.log(categoriesWithInputs);

    };

    const daForm = categoriesWithInputs.map((category) => 
        <div className="container" key={category.id}>
            <div className="row mb-4  justify-content-center">
                <strong className="h4">----------{category.name}----------</strong>
            </div>
            <div>
                {category.catInputs && category.catInputs.map((input) => ( 
                    <div className="col-3 justify-content-center" key={input.id}>
                        <div className="mb-4 text-center">
                            <div className="row ml-1"> 
                                <strong>{input.label}</strong>
                                <input
                                    type={category.input.inputType}
                                    className="form-control"
                                    id={category.input.id}
                                    placeholder="Insert response here"
                                    name={category.input.label}
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
    }, [], []);
    

    return (
        <div>
            {daForm}
        </div>

    );

};

export default DisplayForm;