import axios from 'axios'

const USERS_REST_API_URL = 'http://localhost:8080/api/users';

class UserService {

    getUsers(){
        return axios.get(USERS_REST_API_URL);
    }

    createUser(formData){
        return axios.post('http://localhost:8080/api/sign-up', formData)
    }

    authenticateUser(formData){
        return axios.post('http://localhost:8080/api/sign-in', formData)
    }

}

export default new UserService()