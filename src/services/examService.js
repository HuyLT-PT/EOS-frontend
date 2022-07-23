import { constant } from 'lodash';
import axios from '../axios'


const getAllExams = (inputId) => {
    // template string
    return axios.get(`/api/get-exam?id=${inputId}`);
}
const getAnswerFromStudent = (inputId) => {
    // template string
    return axios.get(`/api/get-answer?id=${inputId}`);
}
const deleteExamService = (examId) => {
    return axios.delete('/api/delete-exam', {
        data: {
            id:examId
        }
    })
}
const createNewExamService = (data) => {
    return axios.post('/api/create-new-exam',data)
} 
const editExamService = (data) => {
    return axios.put('/api/edit-exam', data)
}
const getResultExam = (examId) => {
    return axios.get(`/api/get-point?id=${examId}`)
}
const saveExam = (data) => {
    return axios.put('/api/save-exam', data)
}
const uploadImgForExamAns = (data) => {
    return axios.post('/api/upload-img',data)
}
export {
    getAllExams,
    deleteExamService,
    editExamService,
    createNewExamService,
    getResultExam,
    getAnswerFromStudent,
    saveExam,
    uploadImgForExamAns
}