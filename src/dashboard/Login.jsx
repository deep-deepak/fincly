// src/components/LoginPage.js
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Paper, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Col, Row } from "react-bootstrap";
import { loginUser } from "../service/user";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const LoginPage = ({ onLogin }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
        // Validate username (example: must be at least 3 characters long)
        if (!value) {
            setUsernameError('Nazwa użytkownika jest wymagana.')
        } else if (value.length < 3) {
            setUsernameError('Nazwa użytkownika musi mieć co najmniej 3 znaki.');
        } else {
            setUsernameError('');
        }
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        if (!value) {
            setPasswordError('Wymagane jest hasło.');
        } else if (value.length < 6) {
            setPasswordError('Hasło musi mieć co najmniej 6 znaków.');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (username.length >= 3 && password.length >= 6) {
                // Add your authentication logic here (e.g., API call, validation)
                setIsLoading(true);
                const result = await loginUser({ username: username, password: password })
                if (result.response.status === "success") {
                    localStorage.setItem("isAuthentication", true);
                    onLogin();
                    setUsername("");
                    setPassword("");
                    toast.success("Login successfully!")
                    setIsLoading(false)
                    return;
                } else {
                    toast.error("Invalid credential!");
                    setIsLoading(false)
                    return;
                }
            }
        } catch (error) {
            toast.error("Something went wrong!")
            setIsLoading(false);
            console.log("error", error)

        }
    };

    return (
        <Container component="main" maxWidth="xs" className="main_login">
            <Row>
                <Col md={6} className="left_login_sec">
                    <div className="main">
                        <h2 className="wlc">Witamy spowrotem</h2>
                        <p className="desc">Jest faktem od dawna ustalonym, że czytelnik będzie rozpraszany
                            czytelna treść strony, patrząc na jej układ. The
                            punkt użycia.</p>
                    </div>
                </Col>
                <Col md={6} className="right_login_sec">
                    <Paper elevation={3} className="login_sec">
                        <div className="login_img">
                            <img src="images/logo.webp" />
                        </div>
                        <Typography variant="h5" align="center" gutterBottom>
                            Zaloguj sie
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="nazwa użytkownika"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={handleUsernameChange}
                                error={Boolean(usernameError)}
                                helperText={usernameError}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="hasło"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={handlePasswordChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleTogglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(passwordError)}
                                helperText={passwordError}
                            />
                            {isLoading ? (<ClipLoader size={24} color="#000" className="login_loader" />) : (

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Zalogować się
                                </Button>
                            )}
                        </Box>
                    </Paper>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
