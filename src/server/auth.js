import urlConfig from '../config/url.config';
import axios from 'axios';


export class AuthService {

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: urlConfig.backendUrl,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 3000,
        })
    }

    async createAccount({ fullName, email, userId, password, userType}) {
        try {
            const userResponse = await this.axiosInstance.post('/crm/api/auth/signup',{
                name: fullName,
                email,
                userId,
                password,
                userType
            })
            console.log('userResponse:', userResponse)
            return userResponse;
        } catch (error) {
            console.log('createAccount :: Error:', error)
            throw error;
        }
    }
    async login({  userId, password }) {
        try {
            const loginSession = await this.axiosInstance.post('/crm/api/auth/signin', {
                userId,
                password
            })
            console.log(loginSession.data.message)
            return loginSession;
        } catch (error) {
            console.log('server/auth.js :: login :: Error:', error.message)
            throw error;
        }
    }

    async getCurrentUser({ userId, accessToken }) {
        try {
            const fetchUser = await this.axiosInstance.get('/crm/api/user',{
                params: {
                    userId
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            // console.log('userResponse: (in getCurrentUser:: )', fetchUser.data)
            return fetchUser.data;
        } catch (error) {
            console.log('server/auth.js :: getCurrentUser :: Error:', error.message)
            throw error;
        }
    }

    async getAllUsers({ accessToken }) {
        try {
            const fetchAllUsers = await this.axiosInstance.get('/crm/api/users', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log('fetchAllUsers:', fetchAllUsers.data)
            return fetchAllUsers.data;
        } catch (error) {
            console.log('server/auth.js :: getCurrentUser :: Error:', error.message)
            throw error;
        }
    }

    async logout(accessToken) {
        try {
            await this.axiosInstance.get('/crm/api/auth/logout', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        } catch (error) {
            console.log('server/auth.js :: logout :: Error:', error.message)
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


