import { constant } from 'lodash';
import axios from '../axios'

const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}
const getAllusers = (inputId) => {
    // template string
    return axios.get(`/api/get-user?id=${inputId}`);
}
const createNewUserSevice = (data) => {
    return axios.post('/api/create-new-user',data)
}
const deleteUserSevice = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id:userId
        }
    })
}
const editUserSevice = (data) => {
    return axios.put('/api/edit-user', data)
}
export {
    handleLoginApi,
    getAllusers,
    createNewUserSevice,
    deleteUserSevice,
    editUserSevice
};