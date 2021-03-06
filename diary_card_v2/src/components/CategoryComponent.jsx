import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import InputDataService from "./services/InputService";
import ComponentHeader from "./ComponentHeader"
import Input from "./InputComponent";


const Category = ({ formSubmitted, dateSubmitted, 
  currentCategory, formState, setSuccess }) => {

  //const [category, setCategory] = useState(currentCategory);
  //const [message, setMessage] = useState("");

  const [inputs, setInputs] = useState([]);
  //const [currentInputIndex, setCurrentInputIndex] = useState(-1);

  const { formId } = useParams();
  const { formName } = useParams();
  const { catId } = useParams();
  const { catName } = useParams();

  const chooseSource = () => {
    if (currentCategory == null) {
      return catId;
    } else return currentCategory.id;
  }
  
  useEffect(() => {
    retrieveInputsByCategory(chooseSource());
  }, [] );

  // const retrieveCategoryById = (id) => {
  //   CategoryDataService.get(id)
  //     .then(response => {
  //       setCategory(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  const retrieveInputsByCategory = (id) => {
      InputDataService.getAllByCategory(id)
        .then(response => {
          let sentArray = response.data;
          let newObject = {};

          for (let inp of sentArray) {
            const addObject = Object.assign(newObject, {
              [inp.label]: {
                id: inp.id,
                label: inp.label,
                category: inp.category
              }
            })
          }
          
          setInputs(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  };

  // const handleInputChange = event => {
  //   const { name, value } = event.target;
  //   setCurrentCategory({ ...currentCategory, [name]: value });
  // };
  
  // const updateCategory = () => {
  //   CategoryDataService.update(currentCategory.id, currentCategory)
  //     .then(response => {
  //       console.log(response.data);
  //       setMessage("The category was updated successfully!");
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  // const deleteCategory = () => {
  //     CategoryDataService.remove(currentCategory.id)
  //     .then(response => {
  //       console.log(response.data);
  //     window.location.href = "/categories"
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  // const unavailable = (event) => {
  //   setMessage(" is unavailable at this time");
  // }

  // const goToCategories = () => {
  //   window.location.href = "/categories"
  // }

  return (
    <div>
      {catId &&
        <div>
          <ComponentHeader
            componentName={catName}
            type="Category" 
            types="Categories" 
            subType="Input" 
            subTypes="Inputs" 
            componentId={catId} 
            formName={formName}
            formId={formId}
            url="categories" 
          />
        </div>
      }
        <div className="row mb-5 justify-content-center">
          {inputs && inputs.map((input) => (
            <div className="col-3 justify-content-center" key={input.id}>
              <div className="mb-4 text-center">
                <Input
                  currentInput={input}
                  formSubmitted={formSubmitted}
                  dateSubmitted={dateSubmitted}
                  formState={formState}
                  currentCategory={currentCategory}
                  setSuccess={setSuccess}
                />
              </div>
            </div>
          ))}
        </div>
      </div>   
  );
};

export default Category;