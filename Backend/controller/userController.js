import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";

//controller ke andar hmesa business logic aata h jaisa ki user ko login krvana register karvana h 
export const register = async(req,res)=>{
    try{
        const{fullName, username, password, confirmPassword,gender} = req.body;
        if(!fullName || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({message:"All feilds are required"});
        }
        if(password !== confirmPassword){
            return res.status(400).json({message:"Password do not match"});

        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message:"UserName alreay exist try different"});
        }
        // agr koi hum normal password rkhte h jaise surbhi124 to ise hacker easily crack kr leghe
        // to isi se bachane ke liye hum is password ko hash me convert deghe jaise surbhi124uhfh325@3 (that means usme koi bhi random string add ho jayeghi )
        // isi ke liye hum bcrypt.js use krte h 
        
        const hashedPassword = await bcrypt.hash(password,10);

        //profile photo leke aane ke liye hum placeholder avaatr use kreghe 
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
            fullName,
            username,
            password:hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender

        });
        return res.status(201).json({
            message:"Account Craeted Successfully",
            success:true
        })
    }catch(error){
        console.log(error);

    return res.status(500).json({
        message:"Internal server error"
    });
}
};
 export const login = async (req,res)=>{
        try{
            const {username,password} = req.body;
            if(!username || !password ){
            return res.status(400).json({message:"All feilds are required"});
        };
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                message:"Incorrect username or Password",
                succes:false
            })
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
              return res.status(400).json({
                message:"Incorrect username or Password",
                succes:false

        })

        };
       
        const tokenData={
            userId:user._id
        };
        const token = jwt.sign({ userId:user._id },process.env.JWT_SECRET_KEY,{expiresIn:'1d'} );
        // const token =xy (kuch is tarah se hi ye cookies me save hogha h )
        return res.status(200).cookie("token",token , {maxAge:1*24*60*60*1000, httpOnly:true , sameSite:'lax' }).json({
            _id:user._id,
            username:user.username,
            fullName:user.fullName,
            profilePhoto:user.profilePhoto
        });
        

        }
     catch(error){
        console.log(error);
    }
}
export const logout = (req,res)=>{
    try{
        return res.status(200).cookie("token", "", {maxAge:0}).json({
        message:"logged out successfully"
        
        })
    } catch(error){
                console.log(error);
    }
}
export const getOtherUser = async(req,res) => {
    try{
        const loggedInUserId = req.id;
        const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        return res.status(200).json(otherUsers);
    }catch(error){
        console.log(error);
    }
}
