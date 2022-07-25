import { constant } from 'lodash';
import axios from '../axios'


const getAllExams = (inputId) => {
    // template string
    return axios.get(`/api/get-exam?id=${inputId}`);
}
const getAnswerFromStudent = (inputId,studentId) => {
    // template string
    return axios.get(`/api/get-answer?id=${inputId}&std=${studentId}`);
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
const getResultExam = (examId,studentId) => {
    return axios.get(`/api/get-point?id=${examId}&sid=${studentId}`)
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