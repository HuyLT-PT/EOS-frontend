import { constant } from 'lodash';
import axios from '../axios'


const getAllExams = (inputId) => {
    // template string
    return axios.get(`/api/get-exam?id=${inputId}`);
}
const deleteExamSevice = (examId) => {
    return axios.delete('/api/delete-exam', {
        data: {
            id:examId
        }
    })
}
const createNewExamSevice = (data) => {
    return axios.post('/api/create-new-exam',data)
} 
const editExamSevice = (data) => {
    return axios.put('/api/edit-exam', data)
}
export {
    getAllExams,
    deleteExamSevice,
    editExamSevice,
    createNewExamSevice
}