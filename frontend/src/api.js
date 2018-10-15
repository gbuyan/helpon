import axios from "axios";

axios.defaults.headers.post["Accept"] = "*/*";

export const instance = axios.create({
    baseUrl: 'http://localhost:3000',
    headers: {Accept: "*/*"}
});

export const clientRegistration = () => instance
    .get('/api/me')
    .then(response => response);