import React, { useEffect, useState } from 'react'
import { Grid, Paper, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuBar from './MenuBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Account circle icon
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import DashboardContent from './DashboardContent';
import UsersComponent from './User';
import ProductsComponent from './Product';
import CustomersComponent from './Customer';
import RevenusComponent from './Revenue';
import LoginPage from './Login';
import MainComponent from './MainComponent';
import List from './document/List';

export default function Dashboard() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState('main');
    const [isLoggedIn, setIsLoggedIn] = useState(true); 

    useEffect(() => {
        const authenticateUser = localStorage.getItem("isAuthentication");
        if (authenticateUser) {
            setIsAuthenticated(true);
            setIsLoggedIn(true);
        }
    }, []);

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    const handleLogout = () => {
        // Example: Implement logout functionality
        localStorage.removeItem("isAuthentication");
        setIsAuthenticated(false);
        setIsLoggedIn(false);
        // Redirect to login page or perform necessary logout actions
    };

  

    const renderContent = () => {
        switch (selectedMenuItem) {
            case 'main':
                return <MainComponent />;
            case 'task':
                return <UsersComponent />;
            case 'contractors':
                return <p>contractors</p>;
            case 'goods':
                return <ProductsComponent />;
            case 'units':
                return <p>units</p>;
            case 'documents':
                return <List />;
            case 'revenues':
                return <RevenusComponent />;
            default:
                return null;
        }
    };

    return (
        <div>
            {isLoggedIn && isAuthenticated ? (
                <>
                    <AppBar position="sticky">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className='header_img'>
                                <img src='images/logo.webp' />
                            </Typography>
                            <>
                                
                                <IconButton
                                    size="large"
                                    edge="end"
                                    color="inherit"
                                    aria-label="account of current user"
                                >
                                    <AccountCircleIcon />
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    color="inherit"
                                    aria-label="logout"
                                    onClick={handleLogout}
                                >
                                    <ExitToAppIcon />
                                </IconButton>
                            </>
                        </Toolbar>

                    </AppBar>
                    <Grid container spacing={3}>
                        {/* Left Side: Menu Bar */}
                        <Grid item xs={12} md={3} className='left_sidebar'>
                            <Paper>
                                <MenuBar
                                    selectedMenuItem={selectedMenuItem}
                                    onMenuItemClick={handleMenuItemClick}
                                />
                            </Paper>
                        </Grid>

                        {/* Right Side: Corresponding Content */}
                        <Grid item xs={12} md={9} className='right_sidebar'>
                            <Paper className='main_content'>
                                {renderContent()}
                            </Paper>
                        </Grid>
                    </Grid>
                </>
            ) : (
                <div className='login_main'>
                    <LoginPage onLogin={() => {
                        setIsAuthenticated(true);
                        setIsLoggedIn(true);
                    }} />
                </div>
            )}

        </div>
    )
}
