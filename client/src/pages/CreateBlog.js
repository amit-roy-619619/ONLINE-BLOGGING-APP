import React, { useState } from 'react';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const CreateBlog = () => {
    const id = localStorage.getItem('userId')
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: ''
    })
    //input change
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    //form
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("/api/v1/blog/create-blog", {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id
            })
            if (data?.success) {
                toast.success('blog created successfully')
                navigate("/my-blogs")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box border={3} borderRadius={10} padding={3} margin="auto"
                    boxShadow={'10px 10px 20px #ccc'}
                    display="flex"
                    flexDirection={'column'}
                    width={'50%'}
                    marginTop='30px'
                >
                    <Typography variant='h2' textAlign={'center'} fontWeight='bold'
                        padding={3} color='grey'>
                        Create a Post
                    </Typography>
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}>
                        Title
                    </InputLabel>
                    <TextField name="title" margin='normal' variant='outlined' value={inputs.title}
                        onChange={handleChange} required>

                    </TextField>
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}>
                        Description
                    </InputLabel>
                    <TextField name="description" margin='normal' variant='outlined' value={inputs.description}
                        onChange={handleChange} required>

                    </TextField>
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}>
                        Image URL
                    </InputLabel>
                    <TextField name="image" margin='normal' variant='outlined' value={inputs.image}
                        onChange={handleChange} required>

                    </TextField>
                    <Button type='submit' color='primary' variant='contained'>
                        SUBMIT
                    </Button>

                </Box>
            </form>
        </>
    )
}

export default CreateBlog