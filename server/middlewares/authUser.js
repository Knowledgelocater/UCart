import jwt from "jsonwebtoken"; // import jsonwebtoken for token verification

const authUser = async (req , res , next) => {
    const {token} = req.cookies; // get the token from the cookies

    if(!token){
        return res.json({success : false , message: "Unauthorized"}); // if token is not present, return unauthorized error
    }

    try {
        const tokenDecode = jwt.verify(token , process.env.JWT_SECRET); // verify the token
        if(tokenDecode.id){
            req.body = req.body || {}; // initialize req.body if it is undefined , ensures that req.body is not defined
            req.body.userId = tokenDecode.id; // if token is valid, set the userId in the request body
        } else {
            return res.json({success : false , message: "Unauthorized"}); // if token is invalid, return unauthorized error
        }
        next(); // call the next middleware or route handler
    } catch (error) {
        res.json({success : false , message: error.message});
    }
}

export default authUser; // export the authUser middleware to be used in other files