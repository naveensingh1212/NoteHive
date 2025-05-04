import jwt from 'jsonwebtoken'; // <-- ADD THIS LINE

export const authenticator = async (req, res, next) => {
   const authHeader = req.headers.authorization;

   if (!authHeader) {
      console.log("No token provided");
      return res.status(401).json({ message: "No token provided" });
   }

   const token = authHeader.split(' ')[1];
   console.log("Token received:", token);

   try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
      console.log("Decoded token:", decoded);

      // Update this line to use `userId` from the token
      req.user = { id: decoded.userId, email: decoded.email };  // Attach user ID and email to the request
      next(); // Allow route access
   } catch (err) {
      console.error("Token verification failed:", err);
      return res.status(403).json({ message: "Invalid or expired token" });
   }
};
