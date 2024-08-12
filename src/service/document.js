import axios from "axios";


export const getDocumentList = async (formData) => {
    console.log("Params:", formData);

    try {
        const response = await axios.get('http://localhost:5000/api/document', {
            params: formData // Sending data as query parameters
        });
        // Assuming the response data structure has a 'status' field to check
        if (response.status === 200) {
            return { status: 'success', data: response.data };
        } else {
            return { status: 'error', message: 'Unexpected response status' };
        }
    } catch (error) {
        // Return a meaningful error message
        return { status: 'error', message: error.response?.data?.message || error.message || 'An error occurred' };
    }
};