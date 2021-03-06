import { useState, useEffect } from "react";
import InputResponseDataService from "./services/InputResponseService";
import { useParams } from 'react-router-dom';

const InputResponse = () => {
    
    const [currentInputResponse, setCurrentInputResponse] = useState(initialInputResponseState);
    const [message, setMessage] = useState("");

    // Input ID
    const { id } = useParams();

    useEffect(() => {
        getInputResponse(id);
    }, [id]);

    const getInputResponse = id => {
        InputResponseDataService.get(id)
        .then(response => {
            setCurrentInputResponse(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    // const handleInputChange = event => {
    //     const { name, value } = event.target;
    //     setCurrentInputResponse({ ...currentInputResponse, [name]: value });
    // };

    // const updateInputResponse = () => {
    //     InputResponseDataService.update(currentInputResponse.id, currentInputResponse)
    //     .then(response => {
    //         console.log(response.data);
    //         setMessage("Your response was updated successfully!");
    //     })
    //     .catch(e => {
    //         console.log(e);
    //     });
    // };

    // const deleteInputResponse = () => {
    //     InputResponseDataService.remove(currentInputResponse.id)
    //     .then(response => {
    //         window.location.href = "/input-responses"
    //     })
    //     .catch(e => {
    //         console.log(e);
    //     });
    // };

    // const goToInputResponses = () => {
    //     window.location.href = "/input-responses"
    // }

    return (
        <div>
            <ComponentHeader 
                componentName={currentInputResponse.response} 
                type="Response" 
                types="Responses" 
                subType="" 
                subTypes="" 
                componentId={currentInputResponse.id} 
                url="/input-responses" />
        </div>
    )
}