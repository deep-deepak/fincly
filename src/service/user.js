import axios from "axios";


export const loginUser = async (params) => {
    try {
        const response = await axios.post('http://localhost:5000/api/user/login', params);
        return response.data;
    } catch (error) {
        return { status: 'error', message: error.message };
    }
}
