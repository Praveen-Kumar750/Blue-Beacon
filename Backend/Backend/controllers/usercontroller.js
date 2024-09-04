import {User} from "../models/user.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register=async(req,res)=>{
    try{
        const{ name,email,phoneNumber,password}=req.body;
        if(!name ||  !email || !phoneNumber || !password){
            return res.status(400).json({
                message:"something is missing",
                success:false
            });
        };
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"user already exist with this email",
                success:false,
            });
        }
        const hashedPassword= await bycrypt.hash(password,10);
        await User.create({
            name,
            email,
            phoneNumber,
            password:hashedPassword,
        });
        return res.status(201).json({
            message:"account created successfully",
            success:true,
        });
    }catch(error){
        console.log(error);
    }
}


export const login=async(req,res)=>{
    try{
        const{ email,password}=req.body;
        if( !email || !password){
            return res.status(400).json({
                message:"something is missing",
                success:false
            });
        };
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"incorrect email or password",
                success:false,
            });
        };
        const isPasswordMatch=await bycrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"incorrect email or password",
                success:false,
            });
        };
        const tokenData={
            userId:user._id
        }
        const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
        user={
            _id:user._id,
            name:user.name,
            email:user.email,
            phoneNumber:user.phoneNumber,
            CurrentLocation:user.CurrentLocation,
        }
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpsOnly:true,samSite:'strict'}).json({
            message:`welcome back ${user.name}`,
            user,
            success:true,
        })
    }catch(error){
        console.log(error);
    }
} 

export const logout=async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"logged out successfully",
            success:true,
        });
    }catch(error){
        console.log(error);
    }
}

export const updateProfile = async (req,res)=>{
    try{
        const{name,email,phoneNumber,CurrentLocation,Preference}=req.body;
        //const file=req.file;
        // if(!name ||  !email || !phoneNumber ){
        //     return res.status(400).json({
        //         message:"something is missing",
        //         success:false
        //     });
        // };

        //cloudinary file aayga idhar
        // let skillsarray;
        // if(skills){
        //     const skillsArray=skills.split(",");
        // }
        const userId=req.id;//middleware authentication
        let user=await User.findById(userId);
        console.log(userId);
        if(!user){
            req.res.status(400).json({
                message:"user not found",

                success:false
            })
        }
        //updating data
        if(name) user.name=name;
        if(email) user.email=email;
        if(phoneNumber) user.phoneNumber=phoneNumber;
       // if(type) user.CurrentLocation.type=type;
        //if(coordinates) user.CurrentLocation.coordinates=coordinates;

        await user.save();

        user={
            _id:user._id,
            name:user.name,
            email:user.email,
            phoneNumber:user.phoneNumber,
            CurrentLocation:user.CurrentLocation,
        }
        return res.status(200).json({
            message:"Profiles updated successfully. ",
            user,
            success:true
        })
        
    }catch(error){
        console.log(error);
    }
}













