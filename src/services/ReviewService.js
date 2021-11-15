import axios from 'axios';

const API = 'http://localhost:8080/api/v1/reviews';

class ReviewService {

    getAll() {
        return axios.get(API);
    }

    save(review) {
        return axios.post(API, review);
    }

    delete(id) {
        return axios.delete(API + '/' + id);
    }

    update(id, review) {
        return axios.put(API + '/' + id, review);
    }
}

export default new ReviewService();