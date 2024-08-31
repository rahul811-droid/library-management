
import {errorHandler} from '../utils/error.js'
 import Student from '../models/student.model.js'


 export const addNew = async(req,res,next)=>{
   
      

       const {firstName,lastName,AdharcardNo,email,phoneNumber,address,} = req.body ;

    // if (!req.user.isAdmin) {
    //   return next(errorHandler(403, 'You are not allowed to add new student'));
    // }

    if (!firstName || !lastName || !email || !phoneNumber || !AdharcardNo) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
      const findAdhar = await Student.findOne({AdharcardNo});
      if(findAdhar){
        return next(errorHandler(400, 'This adharcard is already registered'));
      }
    const findMail = await Student.findOne({email});
    if(findMail){
        return next(errorHandler(400, 'email is already registered'));

    }
    const newStudent = new Student({
      firstName,lastName,AdharcardNo,email,phoneNumber,address,
    }) 

     const savedStudent = await newStudent.save();

    res.status(201).json({message:'new student details adding successfull',savedStudent});
    } catch (error) {
      next(error)
    }
   

 }






 export const getStudent = async(req,res,next)=>{

  try {
    
    const oneStudent= await Student.findById(req.params.studentId);
    if(!oneStudent){
      return next(errorHandler(404, 'Student not found'));

    }
    res.status(200).json(oneStudent)
  } catch (error) {
    next(error)
  }
 
 }






 export const getAllstudent = async(req,res,next)=>{
  try {
    
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const allStudents = await Student.find().sort({ updatedAt: sortDirection });
    return res.status(200).json(allStudents);

  } catch (error) {
    next(error)
  }
 }





 export const deleteStudent = async(req,res,next)=>{

  try {

  await Student.findOneAndDelete(req.params.studentId);
  res.status(200).json({message:'This Data has been deleted'})
} 
catch (error) {

    next(error)
}

 }

//  export const updateStudent = async(req,res,next)=>{

//   try {

//     await Student.findByIdAndUpdate(req.params.studentId,
//       {
//         $set:{
//           firstName :req.body.firstName,
//           lastName :req.body.lastName,
//           AdharcardNo:req.body.AdharcardNo,
//           email:req.body.email,
//           phoneNumber:req.body.phoneNumber,
//           adress:[

//           ]

//         }
//       },
//       {new:true}
//     );

//     res.status(200).json({message:"Data has been updated"})
//   } catch (error) {
//     next(error);

//   }
//  }

export const updateStudent = async (req, res, next) => {
  try {
    const updateFields = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      AdharcardNo: req.body.AdharcardNo,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address, // Include the address field
    };

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Data has been updated', updatedStudent });
  } catch (error) {
    next(error);
  }
};