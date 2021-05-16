import { Link } from 'react-router-dom';
import InputDataService from "./services/InputService";


const ComponentHeader = ( {componentName, type, types, subType, subTypes, componentId, url} ) => {

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
            {type == "Input"
                ? <div>
                <Link to={"/" + `${type}` + "/" + componentId + "/" + `${subType}` + "/add"}>
                    <button className="badge badge-success mr-2">
                        Edit {type}
                    </button>
                </Link>
                    <button className="badge badge-danger mr-2" onClick={deleteInput}>
                        Delete {type}
                    </button>
                </div>
                : <div>
                    <Link to={"/" + `${type}` + "/" + componentId + "/" + `${subType}` + "/add"}>
                        <button className="badge badge-success mr-2">
                            Add {subType}
                        </button>
                    </Link>
                    <Link to={"/" + `${subTypes}` + "/"}>
                        <button className="badge badge-warning mr-2">
                            View All {subTypes}
                        </button>
                    </Link>
                </div>
            }
            <Link to={"/" + `${types}` +"/"}>
                <button className="badge badge-primary mr-2">
                    View All {types}
                </button>
            </Link>
        </div> 
    </div>);

}

export default ComponentHeader;