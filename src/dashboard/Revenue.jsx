import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const createData = (id, name, amount, date) => {
    return { id, name, amount, date };
};

const initialIncomeRows = [
    createData(1, 'Income A', 500, '2023-01-01'),
    createData(2, 'Income B', 300, '2023-02-01'),
    // Add more rows as needed
];

const RevenusComponent = () => {
    const [value, setValue] = useState(0);
    const [incomeRows, setIncomeRows] = useState(initialIncomeRows);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const displayedIncomeRows = incomeRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div>
            <Tabs value={value} onChange={handleChange} aria-label="Revenus Tabs">
                <Tab label="Income list" />
                <Tab label="Statistics" />
                <Tab label="Defined invoices" />
                <Tab label="Products" />
                <Tab label="Customers" />
                <Tab label="Uploaded files" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => alert("Button click")}
                    style={{ marginBottom: '16px' }}
                    className='add_btn'
                    endIcon={<span onClick={() => alert("test")}><MoreHoriz /></span>}
                >
                    New Invoice
                </Button>
                <Paper>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedIncomeRows.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.amount}</TableCell>
                                        <TableCell>{row.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={incomeRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box>
                    <Typography>Statistics</Typography>
                    {/* Add statistics content here */}
                </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Box>
                    <Typography>Defined Invoices</Typography>
                    {/* Add defined invoices content here */}
                </Box>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Box>
                    <Typography>Products</Typography>
                    {/* Add products content here */}
                </Box>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Box>
                    <Typography>Customers</Typography>
                    {/* Add customers content here */}
                </Box>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <Box>
                    <Typography>Uploaded Files</Typography>
                    {/* Add uploaded files content here */}
                </Box>
            </TabPanel>
        </div>
    );
};

export default RevenusComponent;
