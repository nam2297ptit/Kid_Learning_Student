const config_network = {
    host: `${process.env.REACT_APP_API_PATH}`,
    port: "3001",
};
const api_path = config_network.host + ":" + config_network.port + "/api/v1/";

const config_api = {
    path: api_path,
    // Auth
    login: api_path + "auth",
    register: api_path + "auth/register",
    subject: api_path + "subject",
    quiz: api_path + "quiz",
    user: api_path + "user",
    attachment: api_path + "attachment",
};

module.exports = {
    config_network: config_network,
    config_api: config_api,
};
