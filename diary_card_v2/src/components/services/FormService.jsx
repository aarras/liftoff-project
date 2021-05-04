import http from "../../http-common";

const getAll = () => {
    return http.get("/forms");
};

const get = id => {
    return http.get(`/forms/${id}`);
};

const create = data => {
    return http.post("/forms", data);
};

const update = (id, data) => {
    return http.put(`/forms/${id}`, data);
};

const remove = id => {
    return http.delete(`/forms/${id}`);
};

const removeAll = () => {
    return http.delete('/forms');
};

const findByName = name => {
    return http.get(`/forms?name=${name}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
};