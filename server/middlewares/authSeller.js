import jwt from "jsonwebtoken"; // import jsonwebtoken for token verification

const authSeller = async (req, res, next) => {
    const {sellerToken} = req.cookies; // get the token from the cookies
    
    if(!sellerToken){
        return res.json({success : false , message: "Unauthorized"}); // if token is not present, return unauthorized error
    }
    try {
        const tokenDecode = jwt.verify(sellerToken , process.env.JWT_SECRET); // verify the token
        if(tokenDecode.email === process.env.SELLER_EMAIL){
            next(); // call the next middleware or route handler
        } else {
            return res.json({success : false , message: "Unauthorized"}); // if token is invalid, return unauthorized error
        }

    } catch (error) {
        res.json({success : false , message: error.message});
    }
}

export default authSeller; // export the authUser middleware to be used in other files