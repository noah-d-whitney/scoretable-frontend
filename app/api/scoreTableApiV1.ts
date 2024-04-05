import axios from 'axios';

export const scoreTableApiV1 = axios.create({
        baseURL: 'http://localhost:8008/v1',
        withCredentials: true,
        // withCredentials: true,
        // headers: {
        //     Authorization: `Bearer ${cookies()
        //         .get('AuthToken')?.value}`,
        // },
    }
);
