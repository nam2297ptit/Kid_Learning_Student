const config_api = require("../../../../config/config").config_api;
const utils = require("../../../../utils/LocalStorage");
const axios = require('axios');

function startQuiz(quizId, callback){
    axios({
        url: config_api.quiz + "/start/" + quizId,
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getToken()
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
function submitQuiz(arrAnswers,callback){
    axios({
        url: config_api.quiz + "/submit",
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getToken()
        },
        data: {
            answerArray: arrAnswers
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
    startQuiz: startQuiz,
    submitQuiz: submitQuiz
}