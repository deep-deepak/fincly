import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

const username = 'Fincly';
const apiToken = 'C1YyHNY4A47cDH38tJmP';

const generateReqId = () => {
    return uuidv4();
};

const urlEncode = (str) => {
    return encodeURIComponent(str).replace(/[!'()*]/g, escape);
};

export const generateReqSig = (reqId) => {
    // Prepare parameters
    const params = {
        company_program_id: "1AB",
        policy: "SALDEO",
        req_id: "12345",
        username: "fincly",
        // company_program_id: "36351",
        // policy: "SALDEO",
        // req_id: "1235",
        // username: "FINALLY",

    };

    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('');
    console.log("queryString", queryString)
    // Create MD5 hash
    const md5Hash = CryptoJS.MD5(queryString).toString(CryptoJS.enc.Hex);

    return md5Hash
};


const generateAuthData = () => {
    const reqId = generateReqId();
    const reqSig = generateReqSig(reqId);

    return {
        req_id: reqId,
        req_sig: reqSig,
        apiToken: apiToken,
        username: username
    };
};

export default generateAuthData;
