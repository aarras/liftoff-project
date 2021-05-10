import http from "../../http-common";

const getAll = () => {
    return http.get("/categories");
};

const getAllByForm = id => {
    return http.get(`/form/${id}/categories`);
};

const get = id => {
    return http.get(`/category/${id}`);
}; 

const create = data => {
    return http.post("/categories", data);
};

const update = (id, data) => {
    return http.put(`/category/${id}`, data);
};

const remove = id => {
    return http.delete(`/categories/${id}`);
};

const removeAll = () => {
    return http.delete('/categories');
};

const findByName = name => {
    return http.get(`/categories?name=${name}`);
};

export default {
    getAll,
    getAllByForm,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
};