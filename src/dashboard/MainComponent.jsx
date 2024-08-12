import React, { useState } from 'react';
import { Add, ArrowForward } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import AddInvoice from './AddInvoice';
import { compressXML, generateUrlEncode, generateMD5Hash, generateRandomReqId, xmlToJson } from '../utils/lib';
import { companySynchronze } from '../service/company';
import { getDocumentList } from '../service/document';

const xmLData = ` <ROOT>
                <COMPANIES>
                <COMPANY>
                    <COMPANY_ID>726902</COMPANY_ID>
                    <COMPANY_PROGRAM_ID>2AC</COMPANY_PROGRAM_ID>
                </COMPANY>
                </COMPANIES>
                </ROOT>`

export default function MainComponent() {

    const [showComponent, setShowComponent] = useState("");
    const [command, setCommand] = useState('');
    const [req_id, setReq_id] = useState('');
    const [req_sig, setReq_sig] = useState('')

    const handleClick = (title) => {
        console.log("title", title)
        setShowComponent(title);
    }

    const rendorComponent = () => {
        switch (showComponent) {
            case "addInvoice":
                return <AddInvoice handleClick={handleClick} />;
            case "invoiceList":
                return <p>Invoice List</p>;
            default:
                return null;
        }
    }

    const handleCompanySynchronize = async () => {
        const xmlRes = compressXML(xmLData);
        const reqId = generateRandomReqId(5);
        if (xmlRes && reqId) {
            const urlEncodedData = `command=${xmlRes}req_id=${reqId}username=fincly`;
            const urlEncodesRes = generateUrlEncode(urlEncodedData);
            if (urlEncodesRes) {
                const md5HData = `${urlEncodesRes}GwsCLOSoToMdUDeEHQFU`
                const md5hRes = generateMD5Hash(md5HData);
                console.log("md5hRes", md5hRes);
                if (md5hRes) {
                    const formData = {
                        username: "fincly",
                        req_id: reqId,
                        req_sig: md5hRes,
                        command: xmlRes
                    }
                    const response = await companySynchronze(formData);
                    console.log("response", response)
                    if (response.status === true) {
                        const jsonResponse = xmlToJson(response.data);
                        console.log("jsonResponse", jsonResponse)
                    }
                }
            }
        }
    }



    const handleDocumentList = async () => {
        const reqId = generateRandomReqId(5)
        const urlEncodeData = `company_program_id=2ACpolicy=SALDEOreq_id=${reqId}username=fincly`;
        const response = generateUrlEncode(urlEncodeData);
        if (response) {
            const md5hData = `${response}GwsCLOSoToMdUDeEHQFU`
            const reqSig = generateMD5Hash(md5hData);
            console.log("reqSig", reqSig);
            if (reqSig) {
                const formData = {
                    username: "fincly",
                    company_program_id: "2AC",
                    req_id: reqId,
                    req_sig: reqSig,
                    policy: "SALDEO",
                }
                const documentRes = await getDocumentList(formData);
                if (documentRes.status === "success") {
                    const jsonResponse = xmlToJson(documentRes.data.data);
                    console.log("jsonResponse", jsonResponse)
                }
            }
        }
    }



    return (
        <div>
            {rendorComponent()}
            {!rendorComponent() && (
                <Container>
                    <Button variant='contained' onClick={handleCompanySynchronize}>company Synchronze</Button>
                    <Button variant='contained' onClick={handleDocumentList}>getDocumentList</Button>
                    <Grid container spacing={2}>
                        <Grid item md={12}>
                            <Box component="section" className="" sx={{ p: 2, border: '1px dashed grey' }}>
                                <Typography variant='h3' className='main_title'>Panel sterowania</Typography>
                                <Grid container>
                                    <Grid item md={3}>
                                        <Typography variant="subtitle1">Faktury</Typography>
                                        <p><Button className='main_btn' onClick={() => setShowComponent("addInvoice")} variant="contained" startIcon={<Add />}>Dodać</Button></p>
                                        <p><Button className='main_btn' variant="contained" onClick={() => setShowComponent("invoiceList")}>Lista faktur</Button></p>
                                        <p><Button className='main_btn' variant="contained">Lista zaliczek</Button></p>
                                        <p><Button className='main_btn' variant="contained">Lista poprawek</Button></p>
                                    </Grid>
                                    <Grid item md={3}>
                                        <Typography variant="subtitle1">Dokumenty</Typography>
                                        <p><Button className='main_btn' variant="contained" startIcon={<Add />}>Dodać</Button></p>
                                        <p><Button className='main_btn' variant="contained">Lista dokumentów</Button></p>
                                    </Grid>
                                    <Grid item md={3}>
                                        <Typography variant="subtitle1">Streszczenie</Typography>
                                        <p><Button className='main_btn' variant="contained">Aktualny</Button></p>
                                        <p><Button className='main_btn' variant="contained">Księgowość</Button></p>
                                    </Grid>
                                    <Grid item md={3}>
                                        <Typography variant="subtitle1">wykonawcy</Typography>
                                        <p><Button className='main_btn' startIcon={<Add />} variant="contained">Dodać</Button></p>
                                        <p><Button className='main_btn' variant="contained">Lista Wykonawców</Button></p>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item md={4}>
                            <Box component="section" className="main_box_section" sx={{ p: 2, border: '1px dashed grey' }}>
                                <Typography variant='h3' className='main_title'>Księgowość</Typography>
                                <Typography variant='h6' className='main_par'>FINCLY Sp. z o. o.</Typography>
                                <Typography variant='p' className='main_desc'>ul. św. Jana 11 Lok. 4
                                    40-012 Katowice
                                    662047641</Typography>
                            </Box>
                        </Grid>
                        <Grid item md={4}>
                            <Box component="section" className="main_box_section" sx={{ p: 2, border: '1px dashed grey' }}>
                                <Typography variant='h3' className='main_title'>Faktury sprzedaży
                                </Typography>
                                <Button startIcon={<ArrowForward />}>Niezapłacone</Button>
                                <br />
                                <Button startIcon={<ArrowForward />}>Przeterminowany</Button>
                            </Box>
                        </Grid>
                        <Grid item md={4}>
                            <Box component="section" className="main_box_section" sx={{ p: 2, border: '1px dashed grey' }}>
                                <Typography variant='h3' className='main_title'>Faktury pro forma</Typography>
                                <Button startIcon={<ArrowForward />}>Niezapłacone</Button>
                                <br />
                                <Button startIcon={<ArrowForward />}>Przeterminowany</Button>
                            </Box>
                        </Grid>
                        <Grid item md={4}>
                            <Box component="section" className="main_box_section" sx={{ p: 2, border: '1px dashed grey' }}>
                                <Typography variant='h3' className='main_title'>Dokumenty kosztowe
                                </Typography>
                                <Button startIcon={<ArrowForward />}>Niezapłacone</Button>
                                <br />
                                <Button startIcon={<ArrowForward />}>Przeterminowany</Button>
                            </Box>
                        </Grid>
                        <Grid item md={4}>
                            <Box component="section" className="main_box_section" sx={{ p: 2, border: '1px dashed grey' }}>
                                <Typography variant='h3' className='main_title'>Sales documents</Typography>
                                <Button startIcon={<ArrowForward />}>Niezapłacone</Button>
                                <br />
                                <Button startIcon={<ArrowForward />}>Przeterminowany</Button>
                            </Box>
                        </Grid>
                        <Grid item md={4}>
                            <Box component="section" className="main_box_section" sx={{ p: 2, border: '1px dashed grey' }}>
                                <Typography variant='h3' className='main_title'>Aktualne podsumowanie
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </div >
    )
}
