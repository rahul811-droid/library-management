import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";


// import nodeMailer from 'nodemailer' ;
// import randomString from 'randomstring' ;

// import configData  from '../config/db.js'




// const sendResetPasswordMail = async(name,email,token)=>{
//   try {
//     const transporter =nodeMailer.createTransport({
//       host:'smtp.gmail.com',
//       port:587,
//       secure:false,
//       requireTLS:true,
//       auth:{
//         user:configData.emailUser,
//         pass:configData.emailPassword
//       }
//     });

//     let mailOptions = {
//       from:configData.emailUser,
//       to:email,
//       subject:'For reset Password',
//       html:'<p>Hii '+name+' , please cpy the link and <a href="http://localhost:5000/api/v1/auth/reset-password?token='+token+' " > reset your password</a></p>'
//     }

//     transporter.sendMail(mailOptions,function(error,info){
//       if(error){
//         console.log(error)
//       }
//       else{
//         console.log('Mail has been sent:-',info.response);
//       }
//     })
//   } catch (error) {
//     next(error)
//   }
// }

export const signup = async (req, res, next) => {
  const {libraryname, username, email, password } = req.body;

  if (
    !libraryname ||
    !username ||
    !email ||
    !password ||
    libraryname === '' ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    libraryname,
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
};



export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};



export const signout = async(req,res,next)=>{
    try {
      res.clearCookie('access_token').status(200).json('User has been signOut');
    } catch (error) {
      next(error);
    }
}

// export const forgetPassword = async(req,res,next)=>{

//   try {
   
//     const {email} = req.body;
//     const userData = await User.findOne({email});
//     if(!userData){
//       return next(errorHandler(401,'No User find in this email'));

//     }
//     else{
//        const randomstr= randomString.generate();
//        const data = await User.updateOne({email:email},{$set:{
//             token:randomstr
//        }});
//        sendResetPasswordMail(userData.name,userData.email,randomstr);
//        res.status(200).json({message:'please check your mail reset password link has been sent'})
//     }

//   } catch (error) {
//     next(error)
//   }
// }


export const getOneUser = async(req,res,next)=>{
 
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }

}


export const getAllUsers = async(req,res,next)=>{

  // if (!req.user.isAdmin) {
  //   return next(errorHandler(403, 'You are not allowed to see all users'));
  // }
  try {
  const startIndex = parseInt(req.query.startIndex) || 0;
  // const limit = parseInt(req.query.limit) 
  const sortDirection = req.query.sort === 'asc' ? 1 : -1;


  const users = await User.find()
  .sort({ createdAt: sortDirection })
  .skip(startIndex);
  // .limit(limit);

  const usersWithoutPassword = users.map((user) => {
    const { password, ...rest } = user._doc;
    return rest;
  });

  const totalUsers = await User.countDocuments();
  const now = new Date();

  const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );
  const lastMonthUsers = await User.countDocuments({
    createdAt: { $gte: oneMonthAgo },
  });

  res.status(200).json({
    users: usersWithoutPassword,
    totalUsers,
    lastMonthUsers,
  });

  } catch (error) {
    next(error)
  }
}


export const updateUser = async(req,res,next)=>{

  if (req.user.id !== req.params.userId &&  !req.user.isAdmin  ) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }
  if (req.body.password) {
    if (req.body.password.length < 8) {
      return next(errorHandler(400, 'Password must be at least 8 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  // if (req.body.username.includes(' ')) {
  //   return next(errorHandler(400, 'Username cannot contain spaces'));
  // }
  try {
    
    const updateData = {
      libraryname:req.body.libraryname,
       username:req.body.username,
        email:req.body.email,
         password:req.body.password
    }

    const updateUser = await User.findByIdAndUpdate(req.params.userId,{
      $set:updateData
    },
    {new:true}
  );
  const { password, ...rest } = updateUser._doc;
  res.status(200).json(rest);

  } catch (error) {
    next(error)
  }

}


export const deleteUser = async(req,res,next)=>{
  // if(!req.user.isAdmin && req.params.userId){
  //   return next(errorHandler(403, 'You are not allowed to delete this user'));
  // }
try {
  
  await User.findByIdAndDelete(req.params.userId);
  res.status(200).json('User has been deleted');

} catch (error) {
  next(error);
}
}