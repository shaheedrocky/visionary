import jwt from 'jsonwebtoken'

export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;

  if (typeof value === "string" || Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  return false;
};


export const generateToken= (userId, res)=>{
  const token = jwt.sign({userId}, process.env.JWT_SECRET,{
    expiresIn: '7d'
  });

  res.cookie('token', token,{
    maxAge: 7*24*60*60*1000, // Milliseconds
    httpOnly: true, // prevent XSS Attack
    sameSite: 'strict', // prevent CSRF attck
    secure: process.env.NODE_ENV === 'development' ? false : true
  })

  return token
}