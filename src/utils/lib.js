import pako from 'pako';
import CryptoJS from 'crypto-js';
import XMLParser from 'react-xml-parser';

export function compressXML(xmlData) {
    try {
        const compressedData = pako.gzip(xmlData);
        const base64Data = btoa(String.fromCharCode(...new Uint8Array(compressedData)));
        return base64Data;
    } catch (err) {
        console.error('Compression failed:', err);
        throw err;
    }
}



export function generateUrlEncode(xmlData) {
    try {
        const urlEncodedData = encodeURIComponent(xmlData);
        return urlEncodedData;
    } catch (err) {
        console.error('Compression failed:', err);
        throw err;
    }
}


export function generateMD5Hash(input) {
    try {
        const hash = CryptoJS.MD5(input).toString(CryptoJS.enc.Hex);
        return hash;
    } catch (err) {
        console.error('Hash generation failed:', err);
        throw err;
    }
}


export function generateRandomReqId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}


export function xmlToJson(xmlData) {
    try {
        const parser = new XMLParser();
        const xml = parser.parseFromString(xmlData);
        return xmlToJsonHelper(xml);
    } catch (err) {
        console.error('XML to JSON conversion failed:', err);
        throw err;
    }
}

function xmlToJsonHelper(xml) {
    if (xml.children.length === 0) {
        return xml.value;
    }

    const json = {};
    for (const child of xml.children) {
        const childJson = xmlToJsonHelper(child);
        if (json[child.name]) {
            // Handle multiple children with the same name
            if (!Array.isArray(json[child.name])) {
                json[child.name] = [json[child.name]];
            }
            json[child.name].push(childJson);
        } else {
            json[child.name] = childJson;
        }
    }
    return json;
} 