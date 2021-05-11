import React, { useState, useEffect } from "react";
import CategoryDataService from "./services/CategoryService";
import InputDataService from "./services/InputService";
import { useParams, Link } from 'react-router-dom';
import ComponentHeader from "./ComponentHeader"


const Category = ( {value} ) => {
    const initialCategoryState = {
      id: null,
      name: "",
      inputType: null,
      form: null
    };

    const [currentCategory, setCurrentCategory] = useState(initialCategoryState);
    const [message, setMessage] = useState("");
    const [task, setTask] = useState("");

    const [inputs, setInputs] = useState([]);
    const [currentInput, setCurrentInput] = useState(null);
    const [currentInputIndex, setCurrentInputIndex] = useState(-1);

    // Category ID
    const { id } = useParams();
  
    const sentCategory = value;

    const getCategory = id => {
        CategoryDataService.get(id)
        .then(response => {
            setCurrentCategory(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    const retrieveInputsByCategory = (id) => {
        InputDataService.getAllByCategory(id)
          .then(response => {
            setInputs(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    };

    const setActiveInput = (input, index) => {
        setCurrentInput(input);
        setCurrentInputIndex(index);
    };

    const refreshList = (id) => {
        retrieveInputsByCategory(id);
    }

    const chooseSource = () => {
      let sentCategoryId = sentCategory;
      let categoryId = id;

      if (sentCategoryId == null) {
        return categoryId;
      } else return sentCategoryId;
    }

    useEffect(() => {
      getCategory(chooseSource());
      retrieveInputsByCategory(chooseSource());
    }, [chooseSource()], [chooseSource()]);
  
    const handleInputChange = event => {
      const { name, value } = event.target;
      setCurrentCategory({ ...currentCategory, [name]: value });
    };
    
    const updateCategory = () => {
     CategoryDataService.update(currentCategory.id, currentCategory)
        .then(response => {
         console.log(response.data);
          setMessage("The category was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const deleteCategory = () => {
        CategoryDataService.remove(currentCategory.id)
        .then(response => {
          console.log(response.data);
        window.location.href = "/categories"
        })
        .catch(e => {
          console.log(e);
        });
    };

    const unavailable = (name) => {
      setMessage(name + " is unavailable at this time")
    }
  
    const goToCategories = () => {
      window.location.href = "/categories"
    }

    return (
      <div>
        <ComponentHeader name={currentCategory.name} type="Category" types="Categories" subType="Input" id={currentCategory.id} />
          <div className="row mb-5 justify-content-center">
            {inputs && inputs.map((input) => (
              <div className="col-3 justify-content-center">
                <div className="mb-4 text-center">
                  <strong>{input.label}</strong>
                  <input
                    type={currentCategory.inputType}
                    className="form-control"
                    id={input.label}
                    placeholder="Insert response here"
                    name={input.label}
                  >
                  </input>
                </div>
              </div>
            ))}
          </div>
      </div>
  );
};

export default Category;