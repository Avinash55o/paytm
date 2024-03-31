JWT_SECRET:'arise';
import  jwt  from "jsonwebtoken";

const authMiddleware = (req:any, res: any, next: any)=>{
    const authHeader =req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({})
    }

    const token= authHeader.split(' ')[1];
//*
    interface DecodedData {
        userId: string; // Assuming userId is a string
        // Add other properties from decoded JWT data if needed
      }

    //console.log(token);
    // Bearer jfskdjfs
    try{
        const decoded: DecodedData = jwt.verify(token, 'arise') as DecodedData;
        req.userId=decoded.userId
        next();
    }catch(error){
        return res.status(403)
    }
    

}

export default authMiddleware