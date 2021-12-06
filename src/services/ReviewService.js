import axios from 'axios';
import authHeader from "./auth/authHeader";

// const API = 'https://review-backend-app.herokuapp.com/api/v1/reviews';
const API = 'http://localhost:8080/api/v1/reviews';

class ReviewService {

    getAll(currentPage, reviewsPerPage, searchText) {
        if (searchText !== null) {
            return axios.get(API,{ params: {page: currentPage,size: reviewsPerPage,search: searchText},headers: authHeader() });
        }
        currentPage -= 1;
        return axios.get(API, { params: {page: currentPage, size: reviewsPerPage },  headers: authHeader() });
    }

    get(id) {
        return axios.get(API + '/' + id, { headers: authHeader() });
    }

    save(review) {
        return axios.post(API, review, { headers: authHeader() });
    }

    delete(id) {
        return axios.delete(API + '/' + id, { headers: authHeader() });
    }

    update(id, review) {
        return axios.put(API + '/' + id, review, { headers: authHeader() });
    }
}

export default new ReviewService();