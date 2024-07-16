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
const getBankAccList = async () => {
    return HttpClient.post('/bank-accounts-list');
}
const addBankAcc = async (data) => {
    return HttpClient.post('/bank-accounts/create', data);
}
const deleteBankAcc = async (data) => {
    return HttpClient.post('/bank-accounts/delete', data);
}
const updateBankAcc = async (data) => {
    return HttpClient.post('/bank-accounts/update', data);
}
const getUserProfile = async (data) => {
    return HttpClient.post('/get-user', data);
}
const getCategoryData = async () => {
    return HttpClient.post('/categories');
}
const getsub_CategoryData = async (data) => {
    return HttpClient.post('/sub-categories', data);
}
const fatchState_list = async () => {
    return HttpClient.post('/states');
}
const fatchDist_list = async (data) => {
    return HttpClient.post('/district-list',data);
}
const updateProfile = async (data) => {
    return HttpClient.post('/update-profile',data);
}
const setAboutUs = async (data) => {
    return HttpClient.post('/help/create',data);
}

const HomeService = {
    getAccount,
    setAccount,
    setToken,
    getBankAccList,
    addBankAcc,
    deleteBankAcc,
    updateBankAcc,
    getUserProfile,
    getCategoryData,
    getsub_CategoryData,
    fatchState_list,
    fatchDist_list,
    updateProfile,
    setAboutUs
}

export default HomeService;