import axios from 'axios';

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
        return JSON.parse(localStorage.getItem('user'));
    }

    updateUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
}

export default new AuthService();