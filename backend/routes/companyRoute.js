// routes/products.js
const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const qs = require('querystring');


router.post('/api/company/synchronize', async (req, res) => {
    try {
        const formData = req.body;
        console.log("formData", formData)
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://saldeo.brainshare.pl/api/xml/1.0/company/synchronize',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(formData)
        };

        try {
            const response = await axios.request(config);
            console.log("response", response)

            return res.send({
                status: true,
                data: response.data,
                headers: response.headers
            });
        } catch (error) {
            console.error("error_ravan",error);

        }
    } catch (error) {
        console.log("error", error);
    }
});

module.exports = router;
