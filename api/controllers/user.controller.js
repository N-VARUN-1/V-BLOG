import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs';

export const test = (req,res) => {
    res.json({message: 'API is working'})
}

export const updateUser = async (req, res, next) => {
     if(req.user.id !== req.params.userId){
        return next(errorHandler(403, 'You are not allowed to update'));
     }
     if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(400, 'password must be atleast 6 characters'))
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
     }
     if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 20){
            return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400, 'Username cannot contain spaces'));
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400, 'Username must be in lowercase'));
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400, 'Username can only contain letters and numbers'));
        }
     }
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password
            },
        }, {new: true});
        const { password, ...rest } = updateUser._doc;
        res.status(200).json(rest);
    }catch(err){
        next(err);
    }
}


export const deleteUser = async(req, res, next) => {
    if(!req.user.isAdmin && req.user.id !== req.params.userId){
        return next(errorHandler(403, 'You are not allowed to delete'));
    }
    try{
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('User deleted successfully');
    }catch(err){
        next(err);
    }
};

export const signOut = (req, res, next) => {
    try{
        res.clearCookie('access_token').status(200).json('User signed out successfully');
    }catch(error){
        next(error);
    }
}

export const getUsers = async (req, res, next) => {
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'You are not allowed to all users'));
    }
    try{
        const startIndex = parseInt(req.query.startIndex) || 0; 
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;

        const users = await User.find()
            .sort({createdAt: sortDirection})
            .skip(startIndex)
            .limit(limit);

        const userWithoutPass = users.map((user)=>{
            const {password, ...rest} = user._doc;
            return rest;
        })

        const totalUsers = await User.countDocuments();

        const now = new Date();
        
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        );

        const lastMonthUsers = await User.countDocuments({
            createdAt: {$gte: oneMonthAgo},
        });

        res.status(200).json({
            users: userWithoutPass,
            totalUsers,
            lastMonthUsers
        });
    }catch(error){
        next(error);
    }
}   

export const getUser = async(req, res, next) => {
    try{
        const user = await User.findById(req.params.userId);
        if(!user){
            return next(errorHandler(404, 'User not found!'));
        }
        const {password, ...rest} = user._doc;
        res.status(200).json(rest);
    }catch(error){
        next(error);
    }
}