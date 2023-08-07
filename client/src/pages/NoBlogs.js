import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function BasicCard() {
    return (
        <Card sx={{
            width: '40%', margin: "auto", mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc', ":hover:": {
                boxShadow: '10px 10px 20px #ccc',
            },
        }}>
            <CardContent>

                <Typography variant="h5" component="div">
                    YOU HAVE NO BLOGS TO SHOW
                </Typography>


            </CardContent>

        </Card>
    );
}