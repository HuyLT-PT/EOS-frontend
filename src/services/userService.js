import { constant } from 'lodash';
import axios from '../axios'

const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}
const getAllusers = (inputId) => {
    // template string
    return axios.get(`/api/get-user?id=${inputId}`);
}
const getAllStudents = (classId) => {
    // template string
    return axios.get(`/api/get-student?id=${classId}`);
}
/*const getTeacherFromClass = (teacherId) => {
    // template string
    return axios.get(`/api/get-teacher?id=${teacherId}`);
}*/
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user',data)
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id:userId
        }
    })
}
const editUserService = (data) => {
    return axios.put('/api/edit-user', data)
}
const saveStudentClass = (data) => {
    return axios.put('/api/edit-student-class', data)
}
export {
    handleLoginApi,
    getAllusers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllStudents,
    saveStudentClass,
    //getTeacherFromClass
};