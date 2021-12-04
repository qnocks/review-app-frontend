import axios from 'axios';
import authHeader from "./auth/authHeader";

const API = 'http://localhost:8080/api/test/upload';

class ImageService {

    upload(id, formData) {
        return axios.post(API, formData, { headers: authHeader()});
    }
}

export default new ImageService();