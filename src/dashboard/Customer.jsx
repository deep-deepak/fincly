import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, TextField } from '@mui/material';

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

const createData = (name, email, status) => {
    return { name, email, status };
};

const initialRows = [
    createData('Customer A', 'customerA@example.com', 'Active'),
    createData('Customer B', 'customerB@example.com', 'Inactive'),
    createData('Customer C', 'customerC@example.com', 'Active'),
    createData('Customer D', 'customerD@example.com', 'Inactive'),
    createData('Customer E', 'customerE@example.com', 'Active'),
    createData('Customer F', 'customerF@example.com', 'Inactive'),
    createData('Customer G', 'customerG@example.com', 'Active'),
    // Add more rows as needed
];

const CustomersComponent = () => {
    const [value, setValue] = useState(0);
    const [rows, setRows] = useState(initialRows);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [accountSettings, setAccountSettings] = useState({ username: '', email: '', password: '' });

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

    const handleAccountSettingsChange = (e) => {
        const { name, value } = e.target;
        setAccountSettings({ ...accountSettings, [name]: value });
    };

    const handleAccountSettingsSave = () => {
        // Save account settings logic
        console.log('Account settings saved:', accountSettings);
    };

    // Calculate the rows to be displayed based on pagination
    const displayedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div>
            <Typography variant='h3'>Customers</Typography>
            <Tabs value={value} onChange={handleChange} aria-label="Customers Tabs">
                <Tab label="All Customers" />
                <Tab label="Active Customers" />
                <Tab label="Inactive Customers" />
                <Tab label="Account Settings" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Paper>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedRows.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Paper>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedRows.filter(row => row.status === 'Active').map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.filter(row => row.status === 'Active').length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Paper>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedRows.filter(row => row.status === 'Inactive').map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.filter(row => row.status === 'Inactive').length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Box>
                    <Typography variant="h6">Account Settings</Typography>
                    <TextField
                        label="Username"
                        name="username"
                        value={accountSettings.username}
                        onChange={handleAccountSettingsChange}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={accountSettings.email}
                        onChange={handleAccountSettingsChange}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={accountSettings.password}
                        onChange={handleAccountSettingsChange}
                        margin="normal"
                        fullWidth
                    />
                    <Button variant="contained" color="primary" onClick={handleAccountSettingsSave}>
                        Save
                    </Button>
                </Box>
            </TabPanel>
        </div>
    );
};

export default CustomersComponent;
