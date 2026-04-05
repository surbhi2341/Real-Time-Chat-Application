import jwt from "jsonwebtoken";
const isAuthenticated = async(req,res,next) => {

    try{
        //const token = req.cookies.token;
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"User not authenticated"})
        };
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            
        if(!decode){
            return res.status(401).json({message:"Invalid token"});

        };
       req.userId = decode.userId;
        //req.id= decode.userId;

        //console.log(token);
        next();

    }catch(error){
        console.log(error);
        return res.status(401).json({ message: "Token verification failed" });

    }
};
export default isAuthenticated;

