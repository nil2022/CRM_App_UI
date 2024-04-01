import urlConfig from '../config/url.config';
import axios from 'axios';


export class AuthService {

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: urlConfig.backendUrl,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 3000
        })
    }

    async createAccount({ fullName, email, userId, password, userType}) {
        try {
            const userResponse = await this.axiosInstance.post('/crm/api/v1/auth/register',{
                fullName,
                email,
                userId,
                password,
                userType
            })
            console.log('userResponse:', userResponse.data)
            return userResponse.data;
        } catch (error) {
            console.log('createAccount :: Error:', error.message)
            throw error;
        }
    }
    async login({  userId, password }) {
        try {
            const loginSession = await this.axiosInstance.post('crm/api/v1/auth/login', {
                userId,
                password
            })
            console.log(loginSession)
            return loginSession.data;
        } catch (error) {
            console.log('server/auth.js :: login :: Error:', error.message)
            throw error;
        }
    }

    async getCurrentUser(accessToken) {
        try {
            const fetchUser = await this.axiosInstance.get('/crm/api/v1/auth/current-user',{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            return fetchUser.data;
        } catch (error) {
            console.log('server/auth.js :: getCurrentUser :: Error:', error.response)
            throw error;
        }
    }

    async getAllUsers() {
        try {
            const fetchAllUsers = await this.axiosInstance.get('/crm/api/v1/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })
            console.log('fetchAllUsers:', fetchAllUsers.data)
            localStorage.setItem('allUsers', JSON.stringify(fetchAllUsers.data))
            return fetchAllUsers.data;
        } catch (error) {
            console.log('server/auth.js :: getCurrentUser :: Error:', error.response)
            throw error;
        }
    }

    async refreshAccessToken(refreshToken) {
        try {
            const response = await this.axiosInstance.get('/crm/api/v1/auth/refresh-token', {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                }
            })
            console.log('Access Token Refreshed');
            return response.data;
        } catch(error) {
            console.log('server/auth.js :: refreshAccessToken :: Error:', error.response.data.message)
            throw error.response;
        }
    }

    async logout() {
        try {
            const logoutResponse = await this.axiosInstance.get('/crm/api/v1/auth/logout', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })
            console.log('Logout Response:', logoutResponse.data)
        } catch (error) {
            console.log('server/auth.js :: logout :: Error:', error.response)
            throw error;
        }
    }

    async healthCheck() {
        try {
            const userResponse = await this.axiosInstance.get('/crm/api/health')
            console.log(userResponse.data)
        } catch (error) {
            console.log('server/auth.js :: healthCheck :: Error:', error.message)
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;


