const jwt = require('jsonwebtoken')

const secret = '12345'

module.exports = {
    signToken   : function(email) 
    {
         const token = jwt.sign({email},secret,{expiresIn: '1d'})
         return token
    },
    verifyToken : (req, res, next) => {
     const token =
       req.body.token || req.query.token || req.headers["x-access-token"];
     if (!token) {
       return res.status(403).send("A token is required for authentication");
     }
     try {
       const decoded = jwt.verify(token, secret);
       req.user = decoded;
     } catch (err) {
        console.log(err)
          if (err) {
               let errordata = {
                    message: err.message,
                    expiredAt: err.expiredAt
               };
               return res.status(401).json({
                    message: err.message
               });
          }
     }
     return next();
   }
}