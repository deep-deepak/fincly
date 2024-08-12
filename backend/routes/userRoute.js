// routes/products.js
const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const qs = require('qs');




router.post('/api/user/login', async (req, res) => {
    try {
        let data = qs.stringify({
            'username': req.body.username,
            'password': req.body.password,
            'logouturl': 'http://adresbiura.pl'
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://saldeo.brainshare.pl/mvc/crm-secure/login',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        try {
            const response = await axios.request(config);
            return res.send({
                response: response.data,
                header: response.headers
            });
        } catch (error) {
            console.error(error);
            // Handle error appropriately
            throw error; // Re-throwing the error to handle it in the calling function
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
