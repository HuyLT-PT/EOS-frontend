import { constant } from 'lodash';
import axios from '../axios'


const getAllClasses = (inputId) => {
    // template string
    return axios.get(`/api/get-class?id=${inputId}`);
}

export {
    getAllClasses,
   
}