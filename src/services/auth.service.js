import axios from 'axios'

const API_URL = 'http://127.0.0.1:44010/users/'

class AuthService {
    login(user){
        return axios.post(API_URL + 'login', {
            email: user.email,
            password: user.password
        })
        .then(response => {
            if (response.data.token) {
                const userData = response.data
                localStorage.setItem('user', JSON.stringify(userData))
            }
            return response.data
        })
    }
    
    async logout(token){
        try {
            await axios.post(API_URL + 'logoutAll', {}, { headers: { Authorization: `Bearer ${token}`}})
            .then(response =>{
                return response
            })    
        } catch (error) {
            return error
        }
        
    }

    register(user){
        return axios.post(API_URL + 'signup', {
            name: user.name,
            email: user.email,
            password: user.password
        })
    }
}

export default new AuthService()