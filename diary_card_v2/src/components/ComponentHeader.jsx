import { render } from '@testing-library/react';
import { Link } from 'react-router-dom';


const ComponentHeader = ( {name, type, types, subType, id} ) => {



render() 

return(
    <div>
        <h1>View {type}</h1>
        <h3>{name}</h3>
        <div className="row ml-1 mb-5"> 
            <Link to={"/" + `${type}` + "/" + id + "/" + `${subType}` + "/add"}>
                <button className="badge badge-success mr-2">
                    Add {subType}
                </button>
            </Link>
            <Link to={"/categories/"}>
                <button className="badge badge-warning mr-2">
                    Edit {type}
                </button>
            </Link>
            <Link to={"/categories/"}>
                <button className="badge badge-primary mr-2">
                    View All {types}
                </button>
            </Link>
        </div> 
    </div>);

}

export default ComponentHeader;