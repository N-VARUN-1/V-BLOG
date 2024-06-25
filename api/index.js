import express from 'express';
// const express = require('express'); // to use this method, In package.json, we add type under description and we give commonjs
// "type": "commonjs";
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import userRoutes from '../api/routes/user.route.js';
import authRoutes from '../api/routes/auth.route.js'
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import path from 'path';

const __dirname = path.resolve();

mongoose
    .connect("mongodb://localhost:27017/")
    .then(()=>{
        console.log('MongoDB is connected')
    })
    .catch((err)=>{
        console.log(err);
    });

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/MERNBLOG/dist')))

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'MERNBLOG', 'dist', 'index.html'))
})

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})