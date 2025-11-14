import jwt from "jsonwebtoken"

export default function authorizeUser(req,res,next)
{
        const header = req.header("Authorization") // checking token in header
        if(header != null)
        {
            const token =header.replace("Bearer " , "") // removing "Bearer " from token
            console.log(token)

            //to verify token
            jwt.verify(token ,"i-computers-54!" ,

                //decoded token info
                (error , decoded)=>{
                    
                   if(decoded == null) // invalid token
                   {
                    res.status(401).json(
                        {
                            message : "Invalid Token.Please login again"
                        }
                    )
                   }
                
                   else{
                    req.user = decoded // attaching decoded info to request
                    next()  
                   }
                }
            ) 
        }
        // if no token
        else{
            next()
        }
        
        next() // to pass it to next person
    }