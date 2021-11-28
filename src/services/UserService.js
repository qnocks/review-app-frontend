import axios from 'axios';
import authHeader from "./auth/authHeader";

const API = 'http://localhost:8080/api/v1/users';

class UserService {

    getAll() {
        return axios.get(API, { headers: authHeader() });
    }

    get(id) {
        return axios.get(API + '/' + id, { headers: authHeader() });
    }

    save(user) {
        return axios.post(API, user, { headers: authHeader() });
    }

    delete(id) {
        return axios.delete(API + '/' + id, { headers: authHeader() });
    }

    update(id, user) {
        return axios.put(API + '/' + id, user, { headers: authHeader() });
    }
}

export default new UserService();