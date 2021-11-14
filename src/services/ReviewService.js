import axios from 'axios';

const API = 'http://localhost:8080/cars';

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

}

export default new ReviewService();