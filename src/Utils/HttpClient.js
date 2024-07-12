import AuthService from '../Services/Auth';
import MainStorage from '../Utils/MainStorage'
import { MAIN_BASE_URL } from './EnvVariables';

const BASE_URL = `https://acuitysoftware.co/digi-help-app/api`;



function get(endpoint, params) {
    return request(endpoint, params);
}

function post(endpoint, params) {
    return request(endpoint, params, "POST");
}

function put(endpoint, params) {
    return request(endpoint, params, "PUT");
}

function Delete(endpoint, params) {
    return request(endpoint, params, "DELETE");
}

async function request(endpoint, params = null, method = 'GET') {
    let token = await AuthService.getToken()

    var xmlRequest = new XMLHttpRequest();
    let url = BASE_URL + endpoint;
    console.log('Usertoken>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', token)
    console.log('url>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', url)
    return new Promise((resolve, reject) => {
        xmlRequest.open(method, url, true);

        xmlRequest.setRequestHeader('Accept', '*/*');
        xmlRequest.setRequestHeader('Content-Type', 'application/json');
        xmlRequest.setRequestHeader('Authorization', token);

        if (method == 'GET') {
            xmlRequest.send();
        } else {
            xmlRequest.send(JSON.stringify(params));
        }

        xmlRequest.onreadystatechange = function () { // Call a function when the state changes.   
            // console.log("xmlRequest.response",xmlRequest.response)  
            if (xmlRequest.readyState === XMLHttpRequest.DONE) {
                if (xmlRequest.status === 200) {
                    resolve(JSON.parse(xmlRequest.response));
                } else {
                    try {
                        reject(JSON.parse(xmlRequest.response));
                    } catch (err) {
                        reject({ error: 'Server Error Please try again later !!!', actError: err });
                    }
                }
            }
        }
    })

}




const HttpClient = {
    get,
    post,
    put,
    Delete,
}

export default HttpClient



