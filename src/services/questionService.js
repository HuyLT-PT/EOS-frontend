import { constant } from 'lodash';
import axios from '../axios'


const getAllQuestions = (inputId) => {
    // template string
    return axios.get(`/api/get-question?id=${inputId}`);
}
const getAllQuestionsForTeacher = (inputId) => {
    // template string
    return axios.get(`/api/get-question-for-teacher?id=${inputId}`);
}
const editQuestionService = (data) => {
    return axios.put('/api/edit-question', data)
}

const downloadExamFromReact = () => {
    return 
}
const saveAnswer2DB = (data,answer) => {
    return axios.put('/api/edit-student-answer', data)
}
export {
    getAllQuestions,
    editQuestionService,
    downloadExamFromReact,
    saveAnswer2DB,
    getAllQuestionsForTeacher,
}