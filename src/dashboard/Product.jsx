import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton,
    Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Add } from '@mui/icons-material';

const createData = (name, price, category) => {
    return { name, price, category };
};

const initialRows = [
    createData('Product A', 100, 'Category 1'),
    createData('Product B', 150, 'Category 2'),
    createData('Product C', 80, 'Category 1'),
    createData('Product D', 200, 'Category 3'),
    createData('Product E', 120, 'Category 2'),
    createData('Product F', 90, 'Category 1'),
    createData('Product G', 180, 'Category 3'),
    // Add more rows as needed
];

const ProductsComponent = () => {
    const [rows, setRows] = useState(initialRows);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({ name: '', price: '', category: '' });
    const [currentRowIndex, setCurrentRowIndex] = useState(null);
    const [dialogTitle, setDialogTitle] = useState('Add Product');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenDialog = (action, row, index) => {
        if (action === 'edit') {
            setCurrentProduct(row);
            setCurrentRowIndex(index);
            setDialogTitle('Edit Product');
        } else {
            setCurrentProduct({ name: '', price: '', category: '' });
            setDialogTitle('Add Product');
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaveProduct = () => {
        if (dialogTitle === 'Add Product') {
            setRows([...rows, currentProduct]);
        } else {
            const updatedRows = [...rows];
            updatedRows[currentRowIndex] = currentProduct;
            setRows(updatedRows);
        }
        setCurrentProduct({ name: '', price: '', category: '' });
        handleCloseDialog();
    };

    const handleDeleteProduct = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };

    // Calculate the rows to be displayed based on pagination
    const displayedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Paper>
             <Typography variant='h3'>Products</Typography>
            <Button
                onClick={() => handleOpenDialog('add')}
                variant="contained"
                color="primary"
                startIcon={<Add />}
                className='add_user'
            >
                Add Product
            </Button>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedRows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleOpenDialog('edit', row, index)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleDeleteProduct(index)}
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

            {/* Add/Edit Product Dialog */}
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
                        value={currentProduct.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        value={currentProduct.price}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="category"
                        label="Category"
                        type="text"
                        fullWidth
                        value={currentProduct.category}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveProduct} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default ProductsComponent;
