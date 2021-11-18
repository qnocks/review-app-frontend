import axios from 'axios';
import authHeader from "./authHeader";

const API = 'http://localhost:8080/api/v1/reviews';

class ReviewService {

    getAll() {
        return axios.get(API, { headers: authHeader() });
    }

    get(id) {
        console.log("ReviewService.get(" + id + ")");
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