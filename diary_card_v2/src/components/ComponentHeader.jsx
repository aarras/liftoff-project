import { Link } from 'react-router-dom';
import InputDataService from "./services/InputService";
import urlMe from "./services/urlMe";


const ComponentHeader = ( {componentName, 
                            type, typeName, 
                            types, 
                            subType, subTypes, 
                            formName, formId,
                            catName, catId,
                            componentId, url} ) => {

const deleteInput = () => {
    InputDataService.remove(componentId)
    .then(response => {
        console.log(response.data);
    window.location.href = url
    })
    .catch(e => {
        console.log(e);
    });
};

return(
    <div>
        <h1>View {type}</h1>
        <h3>{componentName}</h3>
        <div className="row ml-1 mb-5"> 
            {type == "Input" &&
                <div>
                    <Link to={urlMe("/" + `${formName}` + "/" + `${formId}` + "/" + `${catName}` + "/" + `${catId}` + "/" + `${componentName}` + "/" + `${componentId}` + "/edit")}>
                        <button className="badge badge-success mr-2">
                            Edit {type}
                        </button>
                    </Link>
                    <button className="badge badge-danger mr-2" onClick={deleteInput}>
                        Delete {type}
                    </button>
                    <Link to={urlMe("/" + `${formName}` + "/" + `${formId}` + "/" + `${catName}` + "/" + `${catId}` + "/" + `${types}`)}>
                        <button className="badge badge-primary mr-2">
                            View All {types}
                        </button>
                    </Link>
                </div>
            }
            {type == "Category" &&
                <div>
                    <Link to={urlMe("/" + `${formName}` + "/" + `${formId}` + "/" + `${componentName}` + "/" + `${componentId}` + "/" + `${subType}` + "/add")}>
                        <button className="badge badge-success mr-2">
                            Add {subType}
                        </button>
                    </Link>
                    <Link to={urlMe("/" + `${formName}` + "/" + `${formId}` + "/" + `${componentName}` + "/" + `${componentId}` + "/" + `${subTypes}` + "/")}>
                        <button className="badge badge-warning mr-2">
                            View All {subTypes}
                        </button>
                    </Link>
                    <Link to={urlMe("/" + `${formName}` + "/" + `${formId}` + "/" + `${types}` +"/")}>
                        <button className="badge badge-primary mr-2">
                            View All {types}
                        </button>
                    </Link>
                </div>
            }
            {type == "Form" &&
                <div>
                    <Link to={urlMe("/" + `${typeName}` + "/" + componentId + "/" + `${subType}` + "/add")}>
                        <button className="badge badge-success mr-2">
                            Add {subType}
                        </button>
                    </Link>
                    <Link to={urlMe("/" + `${typeName}` + "/" + `${componentId}` + "/" + `${subTypes}` + "/")}>
                        <button className="badge badge-warning mr-2">
                            View All {subTypes}
                        </button>
                    </Link>
                    <Link to={urlMe("/" + `${types}` +"/")}>
                        <button className="badge badge-primary mr-2">
                            View All {types}
                        </button>
                    </Link>
                </div>
            }
        </div> 
    </div>);

}

export default ComponentHeader;