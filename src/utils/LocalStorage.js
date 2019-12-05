
function getToken() {
    try {
        return localStorage.getItem("token");
    } catch (e) {
        return null;
    }
}
function getInfo() {
    try {
        return JSON.parse(localStorage.getItem("user"))
    } catch (e) {
        return null;
    }
}

module.exports = {
    getToken: getToken,
    getInfo: getInfo
}
