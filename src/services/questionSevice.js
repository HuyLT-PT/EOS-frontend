import { constant } from 'lodash';
import axios from '../axios'


const getAllQuestions = (inputId) => {
    // template string
    return axios.get(`/api/get-question?id=${inputId}`);
}
const editQuestionSevice = (data) => {
    return axios.put('/api/edit-question', data)
}

const downloadExamFromReact = () => {
    return 
}
export {
    getAllQuestions,
    editQuestionSevice,
    downloadExamFromReact
}