import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryDataService from "./services/CategoryService";
import urlMe from "./services/urlMe";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    const { formName } = useParams();
    const { formId } = useParams();

    useEffect(() => {
        retrieveCategories();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveCategories = () => {
        CategoryDataService.getAll()
            .then(response => {
                setCategories(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveCategories();
        setCurrentCategory(null);
        setCurrentIndex(-1);
    };

    const setActiveCategory = (category, index) => {
        setCurrentCategory(category);
        setCurrentIndex(index);
    };

    const removeAllCategories = () => {
        CategoryDataService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        CategoryDataService.findByName(searchName)
            .then(response => {
                setCategories(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const addCategory = () => {
        window.location.href = urlMe("/" + formName + "/" + formId +  "/category/add")
    }

    return (
        <div className=".container">
            <div className="list row col-md-5">
                <div className="input-group mb-3">
                    <input  
                        type="text"
                        className="form-control"
                        placeholder="Search by Name"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="list row ml-2 mt-3 mb-2">
                <h5 className="mr-4">Select a Category</h5>
                <button className="badge badge-primary mr-2" onClick={addCategory}>
                    Create New Category
                </button>
            </div>
            <div className="list row col-md-5">
                <ul className="list-group">
                    {categories &&
                        categories.map((category, index) => (
                            <li
                                className={
                                    "list-group-item list-group-item-action" + 
                                    (index === currentIndex ? " active" : "")
                                }
                                onClick={() => setActiveCategory(category, index)}
                                key={index}
                            >
                                {category.name} {index === currentIndex ? 
                                <Link
                                to={urlMe("/" + formName + "/" + formId + "/" + currentCategory.name + "/" + currentCategory.id)}
                                className="badge badge-warning ml-3"
                            >
                                View Category
                            </Link> : ""}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryList;