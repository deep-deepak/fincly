import axios from "axios";


export const companySynchronze = async (params) => {
    try {
        const response = await axios.post('http://localhost:5000/api/company/synchronize', params);
        return response.data;
    } catch (error) {
        return { status: 'error', message: error.message };
    }
}
