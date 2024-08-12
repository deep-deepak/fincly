import React, { useState } from 'react';
import { Table, TableBody,IconButton, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const createData = (name, email, role) => {
    return { name, email, role };
};

const initialRows = [
    createData('John Doe', 'john.doe@example.com', 'Admin'),
    createData('Jane Smith', 'jane.smith@example.com', 'Editor'),
    createData('Alice Johnson', 'alice.johnson@example.com', 'Viewer'),
    createData('Michael Brown', 'michael.brown@example.com', 'Editor'),
    createData('Emily Davis', 'emily.davis@example.com', 'Admin'),
    createData('David Harris', 'david.harris@example.com', 'Viewer'),
    createData('Sarah Wilson', 'sarah.wilson@example.com', 'Editor'),
    createData('Chris White', 'chris.white@example.com', 'Admin'),
    createData('Patricia King', 'patricia.king@example.com', 'Viewer'),
    createData('Daniel Lee', 'daniel.lee@example.com', 'Editor'),
    // Add more rows as needed
];

const UsersComponent = () => {
    const [rows, setRows] = useState(initialRows);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentUser, setCurrentUser] = useState({ name: '', email: '', role: '' });
    const [currentRowIndex, setCurrentRowIndex] = useState(null);
    const [dialogTitle, setDialogTitle] = useState('Add User');

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenDialog = (action, row, index) => {
        if (action === 'edit') {
            setCurrentUser(row);
            setCurrentRowIndex(index);
            setDialogTitle('Edit User');
        } else {
            setCurrentUser({ name: '', email: '', role: '' });
            setDialogTitle('Add User');
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaveUser = () => {
        if (dialogTitle === 'Add User') {
            setRows([...rows, currentUser]);
        } else {
            const updatedRows = [...rows];
            updatedRows[currentRowIndex] = currentUser;
            setRows(updatedRows);
        }
        setCurrentUser({ name: '', email: '', role: '' });
        handleCloseDialog();
    };

    const handleDeleteUser = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    // Calculate the rows to be displayed based on pagination
    const displayedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


    return (
        <Paper>
            <Typography variant='h3'>Users</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
                startIcon={<Add />}
                className='add_user'
            >
                Add User
            </Button>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedRows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.role}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleOpenDialog('edit', row, index)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleDeleteUser(index)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
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

            {/* Add/Edit User Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill in the following details:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={currentUser.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={currentUser.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="role"
                        label="Role"
                        type="text"
                        fullWidth
                        value={currentUser.role}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveUser} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default UsersComponent;
