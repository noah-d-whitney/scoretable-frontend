import axios from 'axios';

export const scoreTableApiV1 = axios.create({
    baseURL: 'https://localhost:7272',
    withCredentials: true,
});
