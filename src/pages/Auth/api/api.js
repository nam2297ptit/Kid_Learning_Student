const config_api = require("../../../config/config").config_api;
// const ModalAPI = require("../../../controller/ModalAPI").ModalAPI;
// const utils = require("../../../utils/utils");
const axios = require('axios');

function login(data, callback){
    axios({
        url: config_api.login,
        method: 'POST',
        // withCredentials: true,
        headers: {
            "Content-type": "application/json; charset=utf-8"
        },
        data: {
            "userName": data.userName,
            "password": data.password
        }
    })
    .then(result => {
        return callback(false, result.data)
    })
    .catch(error => {
        if (error.response) {
            // Lỗi khi server nhận được request và không xử lý được, các lỗi này có mã lỗi ngoài dải 2xx
            return callback(error.response)
        } else if (error.request) {
            // Lỗi khi request được tạo ra nhưng server không hồi đáp, vd : net::ERR_CONNECTION_TIMED_OUT
            return callback(error.request);
        } else {
            // Lỗi khi thiết lập request status
            return callback(error.message)
        }
    });
}
function register(data, callback){
    axios({
        url: config_api.register,
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
        data: {
            "userName": data.userName,
            "password": data.password,
            "fullName": data.fullName,
        }
    })
    .then(result => {
        return callback(false, result.data)
    })
    .catch(error => {
        if (error.response) {
            return callback(error.response)
        } else if (error.request) {
            return callback("Please check your internet connection to server");
        } else {
            return callback(error.message)
        }
    });
}

module.exports = {
    login: login,
    register: register
}