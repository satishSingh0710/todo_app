import jwt from "jsonwebtoken"

export const setCookies = (finalUser, res, statusCode = 200, message) => {
    const token = jwt.sign({id: finalUser._id}, process.env.JWT_SECRET);
//   delete finalUser.password;
  res.status(statusCode).cookie("token", token, {
    httpOnly: true, 
    maxAge: 60*60*1000, 
    sameSite: process.env.NODE_ENV=="development"?"lax":"none", 
    secure: process.env.NODE_ENV=="development"?false:true, 
  }).json({succes: true, message: message, token: token});
}