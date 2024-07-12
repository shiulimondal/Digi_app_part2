import HttpClient from "../Utils/HttpClient"
import MainStorage from "../Utils/MainStorage";

const getAccount = async () => {
    return MainStorage.get('account');
}

const setAccount = async (data) => {
    return MainStorage.set('account', data);
}
async function setToken(data) {
    return await MainStorage.set('token', data);
}
async function getToken() {
    return await MainStorage.get('token');
}

const getSendOtp = async (data) => {
    return HttpClient.post('/send-otp', data);
}
const getVeriftOtp = async (data) => {
    return HttpClient.post('/verify-otp', data);
}
const register = async (data) => {
    return HttpClient.post('/register', data);
}
const getLogin = async (data) => {
    return HttpClient.post('/login', data);
}





const AuthService = {
    getAccount,
    setAccount,
    getSendOtp,
    getVeriftOtp,
    register,
    getLogin,
    setToken,
    getToken
}

export default AuthService;