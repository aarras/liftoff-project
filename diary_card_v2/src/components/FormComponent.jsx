import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import FormDataService from "./services/FormService";
import CategoryDataService from "./services/CategoryService";
import ComponentHeader from "./ComponentHeader"
import Category from "./CategoryComponent";


const Form = () => {

  const initialFormState = {
    categories: null
  };

  const [formState, setFormState] = useState(initialFormState);

  const [currentForm, setCurrentForm] = useState(initialFormState);
  //const [message, setMessage] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [categories, setCategories] = useState([]);
  //const [currentCategory, setCurrentCategory] = useState([]);
  //const [currentCategoryIndex, setCurrentCategoryIndex] = useState(-1);

  //const [inputs, setInputs] = useState([]);
  //const [currentInput, setCurrentInput] = useState(initialInputState);
  //const [currentInputIndex, setCurrentInputIndex] = useState(-1);

  // Form ID
  const { formId } = useParams();
  const { formName } = useParams();

  useEffect(() => {
    getForm(formId);
    retrieveCategoriesByForm(formId);
  }, [], []);

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
        let sentArray = response.data;
        let newObject = {};

        for (let cat of sentArray) {
          const addObject = Object.assign(newObject, {
            [cat.name]: { 
              form: cat.form,
              id: cat.id,
              inputType: cat.inputType,
              name: cat.name,
              order: cat.order
              }
          })
        }

        setCategories(response.data);
        setFormState({ ...formState, categories: newObject });
      })
      .catch(e => {
        console.log(e);
      });        
  };

  // const setActiveCategory = (category, index) => {
  //   setCurrentCategory(category);
  //   setCurrentCategoryIndex(index);
  // }

  // const setActiveInput = (input, index) => {
  //   //setCurrentInput(input);
  //   setCurrentInputIndex(index);
  // };

  // const refreshList = (id) => {
  //   retrieveCategoriesByForm(id);
  // }

  // const handleInputChange = event => {
  //   const { name, value } = event.target;
  //   setCurrentForm({ ...currentForm, [name]: value });
  // };
  
  // const updateForm = () => {
  //   FormDataService.update(currentForm.id, currentForm)
  //     .then(response => {
  //       console.log(response.data);
  //       setMessage("The form was updated successfully!");
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  // const deleteForm = () => {
  //     FormDataService.remove(currentForm.id)
  //     .then(response => {
  //     window.location.href = "/forms"
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  const submitForm = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
  }

  // const unavailable = (event) => {
  //   setMessage(name + " is unavailable at this time")
  // }

  const goToForms = () => {
    window.location.href = "/forms"
  }

  return (
    <div>
      <ComponentHeader 
        componentName={currentForm.name} 
        type="Form" 
        typeName={currentForm.name}
        types="Forms" 
        subType="Category" 
        subTypes="Categories" 
        componentId={currentForm.id} 
        url="forms"
      />
        <form onSubmit={submitForm}>
          <div>
            {categories && categories.map((category) => (
              <div className="container" key={category.id}>
                <div className="row mb-4  justify-content-center">
                  <strong className="h4">
                    ----------{category.name}----------
                  </strong>
                </div>
                <Category
                  formSubmitted={formSubmitted}
                  currentCategory={category}
                  formState={formState}
                />
              </div>
            ))}
          </div>
        </form>
      <button
        className="btn btn-primary" 
        form='formInput' 
        content='Submit' 
        value='Submit'
        type='submit'
        form='theForm'
        onClick={submitForm}
      >
          Submit Form
      </button> 
    </div>
  );
};

export default Form;