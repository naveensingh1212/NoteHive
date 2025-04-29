import jwt from 'jsonwebtoken';
export const authenticator = async (req,res,next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
      }
    
      const token=authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token,process.env.ACCESS_SECRET_KEY);
        req.user = decoded; //  Save decoded user info for later use
    next(); // Allow route access
    }catch (err){
        res.status(403).json({ message: "Invalid or expired token" });
    }
}