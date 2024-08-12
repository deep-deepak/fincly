import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, ListItemButton, Button, Popover } from '@mui/material';
import { Add, ExpandLess, ExpandMore } from '@mui/icons-material';

const MenuBar = ({ selectedMenuItem, onMenuItemClick }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [openMenus, setOpenMenus] = useState({
        dashboard: false,
        task: false,
        goods: false,
        documents: false,
        revenues: false,
    });

    const handleClick = (menu) => {
        setOpenMenus((prevOpenMenus) => ({
            ...prevOpenMenus,
            [menu]: !prevOpenMenus[menu],
        }));
    };

    const handleClickAddList = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <List className='menubar_list'>
            <div className='add_all'>
                <Button
                    startIcon={<Add />}
                    variant='contained'
                    className='add_btn_dashboard'
                    onClick={handleClickAddList}
                >
                    Dodać
                </Button>
                <div className='add_list'>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <List className='button_list'>
                            <ListItem className="main_list" button onClick={() => console.log('Document')}>
                                <ListItemText primary='Dokument' />
                            </ListItem>
                            <ListItem className="main_list" button onClick={() => console.log('Contractor')}>
                                <ListItemText primary='Wykonawca' />
                            </ListItem>
                            <ListItem className="main_list" button onClick={() => console.log('Bank statement')}>
                                <ListItemText primary='wyciąg bankowy' />
                            </ListItem>
                            <ListItem className="main_list" button onClick={() => console.log('Advanve payment')}>
                                <ListItemText primary='Zaliczka' />
                            </ListItem>
                            <ListItem className="main_list" button onClick={() => console.log('Expence for advance payment')}>
                                <ListItemText primary='Wydatki na zaliczkę' />
                            </ListItem>
                            <ListItem className="main_list" button onClick={() => console.log('Cash document')}>
                                <ListItemText primary='Dokument gotówkowy' />
                            </ListItem>
                            <ListItem className="main_list" button onClick={() => console.log('Vat invoice')}>
                                <ListItemText primary='Faktura Vat' />
                            </ListItem>
                            <ListItem className="main_list" button onClick={() => console.log('Advanve payment invoice')}>
                                <ListItemText primary='Faktura z przedpłatą' />
                            </ListItem>
                            <ListItem className="main_list" button onClick={() => console.log('Porforma Invoice')}>
                                <ListItemText primary='Faktura Porforma' />
                            </ListItem>
                            <ListItem className="main_list" button onClick={() => console.log('Commodity')}>
                                <ListItemText primary='Towar' />
                            </ListItem>
                            <ListItem className="main_list" button onClick={() => console.log("workers")}>
                                <ListItemText primary="Pracownicy" />
                            </ListItem>
                            <ListItem className="main_list" button onClick={() => console.log("Personal document")}>
                                <ListItemText primary="Dokument osobisty" />
                            </ListItem>
                            <ListItem className="main_list" button onClick={() => console.log("Task")}>
                                <ListItemText primary="Zadanie" />
                            </ListItem>
                        </List>
                    </Popover>
                </div>
            </div>
            <ListItem
                button
                onClick={() => onMenuItemClick('main')}
                className={selectedMenuItem === 'main' ? 'active' : 'inactive'}
            >
                <ListItemText primary='Główny' />
            </ListItem>
            <div className='list_main'>
                <ListItem
                    button
                    onClick={() => handleClick('task')}
                >
                    <ListItemText primary='Zadania' />
                    {openMenus.task ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMenus.task} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => onMenuItemClick('task')}
                            className={selectedMenuItem === 'task' ? 'active' : 'inactive'}
                        >
                            <ListItemText primary='Lista rzeczy do zrobienia' />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => onMenuItemClick('my_task')}
                            className={selectedMenuItem === 'my_task' ? 'active' : 'inactive'}
                        >
                            <ListItemText primary='Moje zadania' />
                        </ListItemButton>

                    </List>
                </Collapse>
            </div>
            <ListItem
                button
                onClick={() => onMenuItemClick('contractors')}
                className={selectedMenuItem === 'contractors' ? 'active' : 'inactive'}
            >
                <ListItemText primary='wykonawcy' />
            </ListItem>
            <div className='list_main'>
                <ListItem
                    button
                    onClick={() => handleClick('goods')}

                >
                    <ListItemText primary='Dobra' />
                    {openMenus.goods ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMenus.goods} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => onMenuItemClick('goods')}
                            className={selectedMenuItem === 'goods' ? 'active' : 'inactive'}
                        >
                            <ListItemText primary='Lista towarów' />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => onMenuItemClick('units')}
                            className={selectedMenuItem === 'units' ? 'active' : 'inactive'}
                        >
                            <ListItemText primary='Jednostki masy' />
                        </ListItemButton>
                    </List>
                </Collapse>
            </div>
            <div className='list_main'>
                <ListItem
                    button
                    onClick={() => handleClick('documents')}
                >
                    <ListItemText primary='Documents' />
                    {openMenus.documents ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMenus.documents} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => onMenuItemClick('documents')}
                            className={selectedMenuItem === 'documents' ? 'active' : 'inactive'}
                        >
                            <ListItemText primary='List of Documents' />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => onMenuItemClick('allDocuments')}
                            className={selectedMenuItem === 'allDocuments' ? 'active' : 'inactive'}
                        >
                            <ListItemText primary='My documents all' />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => onMenuItemClick('searchDocument')}
                            className={selectedMenuItem === 'searchDocument' ? 'active' : 'inactive'}
                        >
                            <ListItemText primary='Search' />
                        </ListItemButton>


                    </List>
                </Collapse>
            </div>
            <div className='list_main'>
                <ListItem
                    button
                    onClick={() => handleClick('revenues')}
                >
                    <ListItemText primary='Przychody' />
                    {openMenus.revenues ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMenus.revenues} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => onMenuItemClick('revenues')}
                            className={selectedMenuItem === 'revenues' ? 'active' : 'inactive'}
                        >
                            <ListItemText primary='Lista przychodów' />
                        </ListItemButton>

                    </List>
                </Collapse>
            </div>
        </List>
    );
};

export default MenuBar;