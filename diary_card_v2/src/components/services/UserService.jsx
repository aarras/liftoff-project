import axios from 'axios'

class UserService {

    getUsers(){
        return axios.get('http://localhost:8080/api/users');
    }

    createUser(formData){
        return axios.post('http://localhost:8080/api/register', formData)
    }

    authenticateUser(formData){
        return axios.post('http://localhost:8080/api/login', formData)
    }

}

export default new UserService()