import urlConfig from '../config/url.config';
import axios from 'axios';


export class AuthService {

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: urlConfig.backendUrl,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    /** REGISTER USER */
    async createAccount({ fullName, email, userId, password, userType}) {
        try {
            const userResponse = await this.axiosInstance({
                url: '/api/v1/auth/register',
                method: 'POST',
                data: {
                    fullName,
                    email,
                    userId,
                    password,
                    userType
                }
            })
            // console.log('userResponse:', userResponse.data)
            return userResponse.data;
        } catch (error) {
            console.log('server/auth.js :: createAccount :: Error:', error.response)
            throw error;
        }
    }

    /** VERIFY USER EMAIL USING OTP */
    async verifyOtp(userId, otp) {
        try {
            const response = await this.axiosInstance({
                url: 'api/v1/auth/verify-user',
                method: 'POST',
                data: { userId, otp }
            })
            // console.log('response:', response.data)
            return response.data
        } catch (error) {
            console.log('server/auth.js :: verifyOtp :: Error:', error.response)
            throw error;
        }
    }

    /** LOGIN USER */
    async login({  userId, password }) {
        try {
            const loginSession = await this.axiosInstance({
                url: 'api/v1/auth/login',
                method: 'POST',
                data: {
                    userId,
                    password
                }
            })
            return loginSession.data;
        } catch (error) {
            console.log('server/auth.js :: login :: Error:', error.message)
            throw error;
        }
    }

    /** FETCH CURRENT LOGGED IN USER */
    async getCurrentUser(accessToken) {
        try {
            const fetchUser = await this.axiosInstance({
                url: '/api/v1/auth/current-user',
                method: 'GET',
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

    /**
     * * Change User Password
     */
    async changeUserPassword(oldPassword, newPassword, confirmPassword) {
        try {
            if (newPassword !== confirmPassword) {
                throw new Error('Passwords do not match !')
            }
            const changePassword = await this.axiosInstance({
                url: '/api/v1/auth/change-password',
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                data: {
                    oldPassword,
                    newPassword
                }
            })
            // console.log('changePassword:', changePassword.data)
            return changePassword.data;
        } catch (error) {
            console.log('server/auth.js :: changeUserPassword :: Error:', error.response)
            throw error;
        }
    }

    /** FETCH ALL USERS IN DATABASE */
    async getAllUsers() {
        try {
            const fetchAllUsers = await this.axiosInstance({
                url: '/api/v1/user/get-all-users',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })
            // console.log('fetchAllUsers:', fetchAllUsers.data)
            // localStorage.setItem('allUsers', JSON.stringify(fetchAllUsers.data.data))
            return fetchAllUsers.data;
        } catch (error) {
            console.log('server/auth.js :: getAllUsers :: Error:', error?.response || 'Something went wrong!')
            throw error;
        }
    }


    /** REFRESH ACCESS TOKEN */
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


    /** UPDATE USERSTATUS DEATILS */
    async editUser(userId, userStatus) {
        try {
            const editUserResponse = await this.axiosInstance({
                url: `/api/v1/user/update-user`,
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                data: {
                    userStatus
                },
                params: {
                    userId
                }
            })
            // console.log('Edit User Response:', editUserResponse.data)
            return editUserResponse.data
        } catch (error) {
            console.log('server/auth.js :: editUser :: Error:', error.response)
            throw error;
        }
    }

    /** DELETE USER FROM DATABASE  */
    // ! PERMANENTLY DELETES USER FROM DATABASE
    async deleteUser(userId) {
        try {
            const deleteUserResponse = await this.axiosInstance({
                url: `/api/v1/users/deleteUser`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                params: {
                    userId
                }
            })
            console.log('Delete User Response:', deleteUserResponse.data)
            return deleteUserResponse.data
        } catch (error) {
            console.log('server/auth.js :: deleteUser :: Error:', error.response)
            throw error;
        }
    }

    /** LOGOUT USER */
    async logout() {
        try {
            const logoutResponse = await this.axiosInstance({
                url: '/api/v1/auth/logout',
                method: 'GET',
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


    // async healthCheck() {
    //     try {
    //         const userResponse = await this.axiosInstance({
    //             url: '/crm/api/health',
    //             method: 'GET'
    //         })
    //         console.log(userResponse.data)
    //     } catch (error) {
    //         console.log('server/auth.js :: healthCheck :: Error:', error.message)
    //         throw error;
    //     }
    // }
}

const authService = new AuthService();

export default authService;


