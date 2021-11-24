import axios from 'axios';
import authHeader from "./authHeader";

const API = 'http://localhost:8080/api/auth';

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
        const user = JSON.parse(localStorage.getItem('user'));

        console.log('getCurrentUser().user:')
        console.log(user)

        // return user;

        return axios.get(API + '/user', {headers: authHeader()}).then(res => {
            if (res.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(res.data));
            }

            return res.data;
        });

        // return JSON.parse(localStorage.getItem('user'));
    }

    updateUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
}

export default new AuthService();