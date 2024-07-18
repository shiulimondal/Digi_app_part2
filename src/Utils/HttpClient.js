import AuthService from '../Services/Auth';
import MainStorage from '../Utils/MainStorage';
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
    let token = await AuthService.getToken();

    var xmlRequest = new XMLHttpRequest();
    let url = BASE_URL + endpoint;
    console.log('Usertoken===================================:', token);
    console.log('URL:', url);
    
    return new Promise((resolve, reject) => {
        xmlRequest.open(method, url, true);

        xmlRequest.setRequestHeader('Accept', '*/*');
        xmlRequest.setRequestHeader('Content-Type', 'application/json');
        xmlRequest.setRequestHeader('Authorization',`Bearer ${token}`);

        if (method === 'GET') {
            xmlRequest.send();
        } else {
            xmlRequest.send(JSON.stringify(params));
        }

        xmlRequest.onreadystatechange = function () {
            if (xmlRequest.readyState === XMLHttpRequest.DONE) {
                const responseText = xmlRequest.responseText;
                // console.log('Response:', responseText);
                
                if (xmlRequest.status === 200) {
                    try {
                        resolve(JSON.parse(responseText));
                    } catch (err) {
                        console.error('JSON Parse Error:', err);
                        reject({ error: 'Invalid JSON response from server.', actError: err });
                    }
                } else {
                    try {
                        reject(JSON.parse(responseText));
                    } catch (err) {
                        console.error('Error Response:', responseText);
                        reject({ error: 'Server Error. Please try again later.', actError: err });
                    }
                }
            }
        };
    });
}

const HttpClient = {
    get,
    post,
    put,
    Delete,
};

export default HttpClient;
