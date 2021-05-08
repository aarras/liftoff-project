import http from "../../http-common";

const getAll = () => {
    return http.get("/inputs");
};

const getAllByForm = id => {
    return http.get(`/form/${id}/inputs`);
};

const get = id => {
    return http.get(`/inputs/${id}`);
}; 

const create = data => {
    return http.post("/inputs", data);
};

const update = (id, data) => {
    return http.put(`/inputs/${id}`, data);
};

const remove = id => {
    return http.delete(`/inputs/${id}`);
};

const removeAll = () => {
    return http.delete('/inputs');
};

const findByLabel = label => {
    return http.get(`/inputs?label=${label}`);
};

export default {
    getAll,
    getAllByForm,
    get,
    create,
    update,
    remove,
    removeAll,
    findByLabel
};