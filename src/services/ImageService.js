import axios from 'axios';
import authHeader from "./auth/authHeader";

const API = 'http://localhost:8080/api/v1/reviews';

class ImageService {

    upload(id, formData) {
        return axios.post(API + '/' + id + '/upload', formData, { headers: authHeader()});
    }
}

export default new ImageService();