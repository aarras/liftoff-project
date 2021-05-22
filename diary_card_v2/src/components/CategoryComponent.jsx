import React, { useState, useEffect } from "react";
import CategoryDataService from "./services/CategoryService";
import InputDataService from "./services/InputService";
import { useParams } from 'react-router-dom';
import ComponentHeader from "./ComponentHeader"
import Input from "./InputComponent";
import PropTypes from "prop-types";


const Category = ( {value, state, setState} ) => {
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

    const sentState = state;

    Category.propTypes = {
      onSubmit: PropTypes.func
    }

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
            setState(response.data);
            setInputs(response.data);
            console.log(state);
          })
          .catch(e => {
            console.log(state);

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
      //retrieveInputsByCategory(chooseSource());
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

    const handleSubmit = (event) => {
      event.preventDefault();
    }

    const unavailable = (event) => {
      event.preventDefault();
      setMessage(" is unavailable at this time");
      //retrieveInputsByCategory(state.id);
      console.log(state);
      //setState({ ...state, [state]: "asdfasfsadf"})
    }
  
    const goToCategories = () => {
      window.location.href = "/categories"
    }

    return (
      <div>
        {!sentCategory &&
          <div>
            <ComponentHeader componentName={currentCategory.name} type="Category" types="Categories" subType="Input" subTypes="Inputs" componentId={currentCategory.id} url="categories" />
          </div>
        }
          <div className="row mb-5 justify-content-center" id='my-form'>
            {inputs && inputs.map((input) => (
              <div className="col-3 justify-content-center" key={input.id}>
                <div className="mb-4 text-center">
                  <Input state={state[state.inputs.indexOf(input)]} setState={newState => setState({ ...state, [input.id]: newState })} value={input.id} />
                  </div>
                  </div>
            ))}
            </div>
                <button className="btn btn-success" onClick={unavailable} />
              </div>
          
      
  );
};

export default Category;