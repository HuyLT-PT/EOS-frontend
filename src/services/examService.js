import { constant } from 'lodash';
import axios from '../axios'


const getAllExams = (inputId) => {
    // template string
    return axios.get(`/api/get-exam?id=${inputId}`);
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
export {
    getAllExams,
    deleteExamService,
    editExamService,
    createNewExamService,
    getResultExam
}