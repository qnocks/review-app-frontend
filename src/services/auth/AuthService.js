import axios from 'axios';
import authHeader from "./authHeader";

const API = 'https://review-backend-app.herokuapp.com/api/auth';
// const API = 'http://localhost:8080/api/auth';

class AuthService {

    login(username, password) {
        return axios.post(API + "/signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(username, email, password) {
        return axios.post(API + "/signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return axios.get(API + '/user', {headers: authHeader()}).then(res => {
            if (res.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(res.data));
            }

            return res.data;
        });
    }

    updateUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
}

export default new AuthService();