import http from "../../http-common";

const getAll = () => {
    return http.get("/input-responses");
};

const getAllByDate = date => {
    return http.get(`/input-responses?date=${date}`);
};

const getAllBetweenDates = (formId, startDate, endDate) => {
    return http.get(`/input-responses-between/${formId}/${startDate}/${endDate}`)
}

const get = id => {
    return http.get(`/input-response/${id}`);
}; 

const create = data => {
    return http.post("/input-responses", data);
};

const update = (id, data) => {
    return http.put(`/input-response/${id}`, data);
};

const remove = id => {
    return http.delete(`/input-response/${id}`);
};

const removeAll = () => {
    return http.delete('/input-response');
};

export default {
    getAll,
    getAllByDate,
    getAllBetweenDates,
    get,
    create,
    update,
    remove,
    removeAll,
};