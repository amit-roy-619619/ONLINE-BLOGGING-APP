import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Box, Typography, TextField, Button } from "@mui/material"
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate()
    //state
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    });

    //handle input change
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    //form handle
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/user/register', { username: inputs.name, email: inputs.email, password: inputs.password })
            if (data.success) {
                toast.success('user register successfully');
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box maxWidth={"450"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} margin={"auto"} marginTop={5} boxShadow="10px 10px 20px #ccc" padding={3} borderRadius={5}>
                    <Typography sx={{ textTransform: "upperCase" }} variant="h4" padding={3} textAlign={'center'}>Register</Typography>
                    <TextField onChange={handleChange} placeholder='name' value={inputs.name} name='name' margin='normal' type='text' required />
                    <TextField onChange={handleChange} placeholder='email' value={inputs.email} name='email' margin='normal' type='email' required />
                    <TextField onChange={handleChange} placeholder='password' value={inputs.password} name='password' margin='normal' type='password' required />
                    <Button sx={{ borderRadius: 3, marginTop: 3 }} type='submit' variant='contained' color='primary'>Submit</Button>
                    <Button sx={{ borderRadius: 3, marginTop: 3 }} type='submit' color='primary' onClick={() => navigate('/login')}>Already Registered, Please Login</Button>
                </Box>
            </form>
        </>
    )
}

export default Register