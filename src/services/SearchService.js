import axios from 'axios';
import authHeader from "./auth/authHeader";

const API = 'https://review-backend-app.herokuapp.com/api/test';
// const API = 'http://localhost:8080/api/test';

class SearchService {

    getSearchReview(text) {
        return axios.get(API + '/search?search=' + text, { headers: authHeader() });
    }

}

export default new SearchService();