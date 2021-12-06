import axios from 'axios';
import authHeader from "./auth/authHeader";

const API = 'https://review-backend-app.herokuapp.com/api/v1/reviews/search';
// const API = 'http://localhost:8080/api/v1/reviews/search';

class SearchService {

    getSearchReview(text) {
        return axios.get(API + '?search=' + text, { headers: authHeader() });
    }

}

export default new SearchService();