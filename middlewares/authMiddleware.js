import jwt from 'jsonwebtoken';


const JWT_SECRET = "zuhairkhan"
const  expiresIn = '1d'
const authMiddleware = (req, res, next) => {

  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
 
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    const decoded = jwt.verify(token, JWT_SECRET , expiresIn );
   
    req.user = decoded;

    next(); // Continue to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

export default authMiddleware;
