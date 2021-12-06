import axios from 'axios';
import authHeader from "./auth/authHeader";

const API = 'https://review-backend-app.herokuapp.com/api/v1/reviews';
// const API = 'http://localhost:8080/api/v1/reviews';

class ImageService {

    upload(id, formData) {
        console.log('СМОТРИ')
        console.log(id)
        console.log(formData.get('image'))
        return axios.post(API + '/' + id + '/upload', formData, { headers: authHeader()});
    }
}

export default new ImageService();