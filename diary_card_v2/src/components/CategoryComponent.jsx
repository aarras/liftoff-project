import React, { useState, useEffect } from "react";
import CategoryDataService from "./services/CategoryService";
import InputDataService from "./services/InputService";
import { useParams, Link } from 'react-router-dom';
import Editable from "./EditableComponent";


const Category = () => {
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
  
    const getCategory = id => {
        CategoryDataService.get(id)
        .then(response => {
            setCurrentCategory(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    const retrieveInputsByCategory = id => {
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

    useEffect(() => {
      getCategory(id);
      retrieveInputsByCategory(id);
    }, [id], [id]);
  
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
            <div className="edit-form">
                <Editable
                    text={task}
                    placeholder={currentCategory.name}
                    type="input"
                    className="h4"
                  >
                    <div className="row ml-1">
                      <input
                        type="text"
                        name="name"
                        placeholder={currentCategory.name}
                        value={currentCategory.name}
                        onChange={handleInputChange}
                        onBlur={updateCategory}
                        className="mr-2 form-control-lg"
                      />
                        <button type="submit" className="badge badge-success mr-2" onClick={() => updateCategory}>
                            Update Category
                         </button>
                        <button className="badge badge-danger mr-2" onClick={e => e.target.blur()}>
                            Cancel
                        </button>
                    </div>
                </Editable>
                    <div className="row ml-1 mb-5"> 
                        <Link to={"/category/" + currentCategory.id + "/input/add"}>
                            <button className="badge badge-warning mr-2">
                                Add Input
                            </button>
                        </Link>
                        <Link to={"/categories/"}>
                            <button className="badge badge-primary mr-2">
                                View All Categories
                            </button>
                        </Link>
                        <br/>
                    </div>          
                    <p>{message}</p>
                    <div>
                        <ul className="list-group">
                            <div className="container no-gutters">
                                <div className="row justify-content-center">
                                    {inputs && inputs.map((input) => (  
                                        <div className="col-4 mb-3">
                                            <strong>{input.label}</strong>
                                                <input
                                                    type={currentCategory.inputType}
                                                    className="form-control"
                                                    id={input.label}
                                                    placeholder="Insert response here"
                                                    name={input.label}
                                                ></input>
                                        </div>          
                                    ))}
                                </div>
                            </div>
                        </ul>
                    </div>
            </div> 
        </div>
  );
};

export default Category;