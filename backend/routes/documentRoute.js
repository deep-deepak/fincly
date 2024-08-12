// routes/products.js
const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

// Define the route for fetching document data
router.get('/api/document', async (req, res) => {
    try {
        // Construct the URL with query parameters
        const formData = req.query;
        console.log("formData", formData);
        const url = 'https://saldeo.brainshare.pl/api/xml/2.12/document/list';
        const params = {
            username: formData.username,
            req_id: formData.req_id,
            policy: formData.policy,
            company_program_id: formData.company_program_id,
            req_sig: formData.req_sig
        };

        // Configuration for the GET request
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: url,
            params: params
        };

        try {
            // Make the GET request
            const response = await axios.request(config);
            console.log("response", response);
            // Send the response data
            return res.send({
                status: true,
                data: response.data,
                headers: response.headers
            });
        } catch (error) {
            console.error("Error during axios request:", error.message || error);
            return res.status(500).json({ status: false, error: error.message || 'Internal Server Error' });
        }
    } catch (error) {
        console.log("Error:", error.message || error);
        return res.status(500).json({ status: false, error: error.message || 'Internal Server Error' });
    }
});

module.exports = router;
