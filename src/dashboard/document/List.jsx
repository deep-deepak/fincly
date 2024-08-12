import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Button,
    IconButton,
    Typography,
    Checkbox,
    FormControl,
    Box,
    Select,
    InputLabel,
    MenuItem,
    Menu
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Add, MoreHoriz } from '@mui/icons-material';
import generateAuthData, { generateReqSig } from '../../utils/Auth';
import axios from 'axios';
import AddDocument from './Add';



const List = () => {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState([]);
    const [filterByDate, setFilterByDate] = React.useState('');
    const [addButton, setAddButton] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);

    const handleMenuClose = () => {
        setAnchorEl(null);
        setCurrentIndex(null);
    };

    const handleMenuOpen = (event, index) => {
        setAnchorEl(event.currentTarget);
        setCurrentIndex(index);
    };

    const handleChange = (event) => {
        const value = event.target.value
        setFilterByDate(value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = displayedRows.map((row, index) => index);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (index) => {
        const selectedIndex = selected.indexOf(index);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, index);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (index) => selected.indexOf(index) !== -1;


    // Calculate the rows to be displayed based on pagination
    const displayedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const authData = generateAuthData();
    const endpointUrl = "https://saldeo.brainshare.pl/api/xml/1.0/document/list";

    const getreqSig = generateReqSig();
    console.log("getreqSig", getreqSig)

    // useEffect(() => {
    //     const { req_id, req_sig, username } = generateAuthData();

    //     axios.get(endpointUrl, {
    //         params: {
    //             username: username,
    //             req_id: req_id,
    //             req_sig: req_sig,
    //             company_program_id: "712400"
    //         }
    //     })
    //         .then(response => {
    //             console.log(response.data);
    //             // Process successful response data
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             if (error.response && error.response.data) {
    //                 console.log("error.response.data")
    //                 // setError(error.response.data);
    //             } else {
    //                 // setError({
    //                 //     STATUS: 'ERROR',
    //                 //     ERROR_MESSAGE: 'Unknown error occurred.'
    //                 // });
    //             }
    //         });
    // }, []);

    const handleFormSubmit = (formData) => {
        setRows(prevData => [...prevData, formData]);
    };


    const handleDelete = () => {
        setRows(prevData => prevData.filter((_, index) => index !== currentIndex));
        handleMenuClose();
    };

    return (
        <>
            {
                addButton ? (
                    <div className='add_document'>
                        <AddDocument handleHideForm={() => [addButton, setAddButton]} onFormSubmit={handleFormSubmit} />
                    </div>
                ) : (
                    <>
                        <div className='header_section'>
                            <Typography variant='h5'>Lista dokumentów</Typography>
                            <Box sx={{ minWidth: 220 }}>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">filtr</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={filterByDate}
                                        onChange={handleChange}
                                        MenuProps={{
                                            Props: {
                                                className: 'filter_list_ui'
                                            },
                                            MenuListProps: {
                                                className: 'menuList_ul'
                                            }
                                        }}
                                    >
                                        <MenuItem className='filter_list' value="Previous month">Poprzedni miesiac</MenuItem>
                                        <MenuItem className='filter_list' value="current quarter">bieżący kwartał</MenuItem>
                                        <MenuItem className='filter_list' value="last 3 months">ostatnie 3 miesiące</MenuItem>
                                        <MenuItem className='filter_list' value="current month">obecny miesiąc</MenuItem>
                                        <MenuItem className='filter_list' value="current year">rok bieżący</MenuItem>
                                        <MenuItem className='filter_list' value="last 12 months">ostatnie 12 miesięcy</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Button variant="contained">pokazywać</Button>
                        </div>
                        <div className='table_content'>
                            <Button
                                // onClick={() => handleOpenDialog('add')}
                                variant="contained"
                                color="primary"
                                startIcon={<Add />}
                                className='add_user'
                                onClick={() => setAddButton(true)}
                            >
                                dodaj dokument
                            </Button>
                            <TableContainer>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    indeterminate={selected.length > 0 && selected.length < displayedRows.length}
                                                    checked={displayedRows.length > 0 && selected.length === displayedRows.length}
                                                    onChange={handleSelectAllClick}
                                                    inputProps={{ 'aria-label': 'select all products' }}
                                                />
                                            </TableCell>
                                            <TableCell>Lp.KSeF</TableCell>
                                            <TableCell>Typ</TableCell>
                                            <TableCell>Osb.</TableCell>
                                            <TableCell>Numer</TableCell>
                                            <TableCell>Kontrahent</TableCell>
                                            <TableCell>Kategoria</TableCell>
                                            <TableCell>rejestr</TableCell>
                                            <TableCell>Data paragonu</TableCell>
                                            <TableCell>Data wydania</TableCell>
                                            <TableCell>Data dostarczenia</TableCell>
                                            <TableCell>Data płatności</TableCell>
                                            <TableCell>Dodany</TableCell>
                                            <TableCell>Wartość brutto</TableCell>
                                            <TableCell>Pozostało do zapłaty</TableCell>
                                            <TableCell>waluta</TableCell>
                                            <TableCell>zbiór danych</TableCell>
                                            <TableCell>Czytać</TableCell>
                                            <TableCell>eksport (stan)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {displayedRows.map((row, index) => {
                                            const isItemSelected = isSelected(index);
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return (
                                                <TableRow
                                                    key={index}
                                                    hover
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={isItemSelected}
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                            onClick={() => handleClick(index)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton onClick={(event) => handleMenuOpen(event, index)}>
                                                            <MoreHoriz />
                                                        </IconButton>
                                                        <Menu
                                                            anchorEl={anchorEl}
                                                            open={Boolean(anchorEl)}
                                                            onClose={handleMenuClose}
                                                        >
                                                            <MenuItem onClick={handleDelete}><DeleteIcon /></MenuItem>
                                                        </Menu>
                                                    </TableCell>

                                                </TableRow>
                                            );
                                        })}
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

                        </div>
                    </>

                )
            }
        </>
    );
};

export default List;
