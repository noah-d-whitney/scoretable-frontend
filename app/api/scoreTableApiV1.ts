import axios from 'axios';

export const scoreTableApiV1 = axios.create({
        baseURL: 'http://localhost:5111',
        withCredentials: true,
        // headers: {
        //     Authorization: `Bearer ${cookies()
        //         .get('AuthToken')?.value}`,
        // },
    }
);
