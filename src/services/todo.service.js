import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://127.0.0.1:44010/tasks/'

class todoService {
    
    async showTasks(){
        try {
           const response = await axios.get(API_URL + 'show', { headers: authHeader() } )
           return response.data 
        } catch (error) {
            return error
        }
    }

    async addTask(text){
        try {
            const response = await axios.post(API_URL + 'add', {
                description: text 
            }, { headers: authHeader()})
            return response.status
        } catch (error) {
           return error 
        }
    }

    async editTask({id, text, status}){
        try {
           const response = await axios.patch(API_URL + 'edit/'+id, {
                description: text,
                complete: status 
           }, { headers: authHeader() }) 
           return response.status
        } catch (error) {
           return error 
        }
    }

    async deleteTask(id){
        try {
           const response = await axios.delete(API_URL + 'delete/'+id, { headers: authHeader()}) 
           console.log(response);
           return response
        } catch (error) {
           return error 
        }
    }

}

export default new todoService()