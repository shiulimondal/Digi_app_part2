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
    return HttpClient.post('/bank-accounts/updat', data);
}


const HomeService = {
    getAccount,
    setAccount,
    setToken,
    getBankAccList,
    addBankAcc,
    deleteBankAcc,
    updateBankAcc
}

export default HomeService;