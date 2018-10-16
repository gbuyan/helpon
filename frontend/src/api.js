import axios from "axios";

axios.defaults.headers.post["Accept"] = "*/*";

export const instance = axios.create({
    baseUrl: 'http://localhost:3000',
    headers: {Accept: "*/*"}
});

export const clientRegistration = params => instance
    .post('/api/v1/registration', params)
    .then(response => response);

export const getUser = () => instance
    .get('/api/v1/user')
    .then(response => response);

export const getDonation = () => instance
    .get('/api/v1/giver/donation')
    .then(response => response);

export const giveDonation = params => instance
    .post('/api/v1/giver/donation', params)
    .then(response => response);

export const getRequests = () => instance
    .get('/api/v1/getter/request')
    .then(response => response);

export const askForDonation = params => instance
    .post('/api/v1/getter/request', params)
    .then(response => response);