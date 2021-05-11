import React, { useState, useEffect } from "react";
import FormDataService from "./services/FormService";
import CategoryDataService from "./services/CategoryService";
import InputDataService from "./services/InputService";
import { useParams, Link } from 'react-router-dom';
import Category from "./CategoryComponent";
import ComponentHeader from "./ComponentHeader"


const Form = () => {
    const initialFormState = {
      id: null,
      name: ""
    };

    const [currentForm, setCurrentForm] = useState(initialFormState);
    const [message, setMessage] = useState("");
    const [task, setTask] = useState("");

    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(-1);

    const [inputs, setInputs] = useState([]);
    const [inputsByCategory, setInputsByCategory] = useState([]);
    const [currentInput, setCurrentInput] = useState(null);
    const [currentInputIndex, setCurrentInputIndex] = useState(-1);

    // Form ID
    const { id } = useParams();
  
    const getForm = id => {
        FormDataService.get(id)
        .then(response => {
            setCurrentForm(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    const retrieveCategoriesByForm = id => {
      CategoryDataService.getAllByForm(id)
        .then(response => {
          setCategories(response.data);
          retrieveAllInputs();
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });        
    };

    const retrieveInputsByCategory = id => {
      console.log("HELP");
      InputDataService.getAllByCategory(id)
        .then(response => {
          setInputs(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    const retrieveAllInputs = () => {
      InputDataService.getAll()
        .then(response => {
          setInputs(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };    

    const setActiveCategory = (category, index) => {
      setCurrentCategory(category);
      setCurrentCategoryIndex(index);
    }

    const setActiveInput = (input, index) => {
      setCurrentInput(input);
      setCurrentInputIndex(index);
    };

    const refreshList = (id) => {
      retrieveCategoriesByForm(id);
    }

    useEffect(() => {
      getForm(id);
      retrieveCategoriesByForm(id);
      retrieveAllInputs();
    }, [id], [id], []);

    const handleInputChange = event => {
      const { name, value } = event.target;
      setCurrentForm({ ...currentForm, [name]: value });
    };
    
    const updateForm = () => {
     FormDataService.update(currentForm.id, currentForm)
        .then(response => {
         console.log(response.data);
          setMessage("The form was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const deleteForm = () => {
        FormDataService.remove(currentForm.id)
        .then(response => {
        window.location.href = "/forms"
        })
        .catch(e => {
          console.log(e);
        });
    };

    const unavailable = (name) => {
      setMessage(name + " is unavailable at this time")
    }
  
    const goToForms = () => {
      window.location.href = "/forms"
    }

    return (
        <div>
          <ComponentHeader name={currentForm.name} type="Form" types="Forms" subType="Category" id={currentForm.id} />
            <div>
              {categories && categories.map((category) => (
                <div className="container">
                  <div className="row mb-4  justify-content-center">
                    <strong className="h4" key={category.id}>----------{category.name}----------</strong>
                  </div>
                  <Category value={category.id}></Category>
                </div>
              ))}
          </div> 
      </div>
  );
};

  export default Form;