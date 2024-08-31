import React, { useEffect, useState } from 'react'
import { Modal, Table, Button, Label, TextInput } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



const initialFormData = {
  firstName: "",
  lastName: "",
  AdharcardNo: "",
  email: "",
  phoneNumber: "",
  address: {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  },
};


const DashStudent = () => {

  const { currentUser } = useSelector((state) => state.user);

  const [students, setStudents] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showStudentUpdateModal, setShowStudentUpdateModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
 const [error,setError] = useState(null);
 const [tab, setTab] = useState('');

  const [formData,setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'address') {
      const [street, city, state, postalCode, country] = value.split(',').map(item => item.trim());
      setFormData((prevState) => ({
        ...prevState,
        address: {
          street: street || "",
          city: city || "",
          state: state || "",
          postalCode: postalCode || "",
          country: country || "",
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/student/getall`)
        const data = await res.json();
        console.log(data); // Log the entire response

        if (res.ok) {
          setStudents(data);

        }
        console.log(data)

      } catch (error) {
        console.log(error.message);
      }
    }

    fetchStudent();

  }, [currentUser._id])

console.log(students)



 

const addStudent = async(e)=>{
e.preventDefault();
try {
  setError(null);
  const res = await fetch('/api/student/add',{
    method:"POST",
    headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
  })
  const data = await res.json();
  if(data.success == false){
    setError(data.message)
  }
 if(res.ok){
  setFormData("");
 }
} catch (error) {
  console.log(error.message)
  setError(data.error.message)

}

}

const studentDelete = async()=>{
    try {
      const res = await fetch(`/api/student/delete/${userIdToDelete}`,{
        method:'DELETE'
      });
      const data = await res.json();
      if(res.ok){
        setStudents((prev)=>prev.filter((student)=>student._id!==userIdToDelete));
        setShowModal(false);
      }
      else{
        console.log(data.message);

      }
    } catch (error) {
      console.log(error.message);

    }
}




  return (
    <div className='table-auto overflow-x-scroll w-screen md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>

    <Button className='m-2' onClick={()=>setShowStudentModal(true)}>AddNew Student</Button>

      <Table hoverable className='shadow-md'>
        <Table.Head>
          <Table.HeadCell>Date created</Table.HeadCell>
          <Table.HeadCell>User image</Table.HeadCell>
          <Table.HeadCell>First Name</Table.HeadCell>
          <Table.HeadCell>Last Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Phone No</Table.HeadCell>
          <Table.HeadCell>Adhharcard No</Table.HeadCell>
          <Table.HeadCell>Adress</Table.HeadCell>
          <Table.HeadCell>Edit</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        {students.map((student) => (
          <Table.Body className='divide-y' key={student._id}>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell>
                {new Date(student.createdAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                <img
                  src={student.profilePicture}
                  className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                />
              </Table.Cell>

              <Table.Cell>
                {student.firstName}
              </Table.Cell>

              <Table.Cell>
                {student.lastName}
              </Table.Cell>

              <Table.Cell>
                {student.email}
              </Table.Cell>

              <Table.Cell>
                {student.phoneNumber}
              </Table.Cell>

              <Table.Cell>
                {student.AdharcardNo}
              </Table.Cell>


              <Table.Cell>
                {student.address[0]?.street}, {student.address[0]?.city}, {student.address[0]?.state}, {student.address[0]?.postalCode}, {student.address[0]?.country}
              </Table.Cell>

              <Table.Cell className='font-medium text-green-500 hover:underline cursor-pointer'
              >
                     <Link to={`/dashboard?tab=student-profile&id=${student._id}`}>
                     <p>Edit</p></Link>


               
              </Table.Cell>

              <Table.Cell>
               <span 
               onClick={()=>{setShowModal(true) ;
              setUserIdToDelete(student._id)
              }}
               className='font-medium text-red-500 hover:underline cursor-pointer'

               >
                Delete
                </span> 
               
              </Table.Cell>

            </Table.Row>
          </Table.Body>
        ))}
      </Table>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this student?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={studentDelete}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>



      <Modal
        show={showStudentModal}
        onClose={() => setShowStudentModal(false)}
        popup
        size='md'
       

      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
           
          <h1 className='text-2xl '>Add new student details</h1>
          <hr />
            <form onSubmit={addStudent} className='flex flex-col gap-2 text-center mt-5 '>

          <div className='flex flex-row gap-2 items-center justify-center'>
            <Label className='font-bold text-xl '>firstName:-</Label>
          <TextInput
          name='firstName'
          onChange={handleChange}
          className='' />
          </div>

          <div className='flex flex-row gap-2 items-center justify-center'>
            <Label className='font-bold text-xl'>lastName:-</Label>
          <TextInput
          name='lastName'
          onChange={handleChange}
          className=''/>
          </div>

          <div className='flex flex-row gap-2 items-center justify-center'>
            <Label className='font-bold text-xl'>AdharcardNo:-</Label>
          <TextInput
           name='AdharcardNo'
           onChange={handleChange}
          className=''/>
          </div>


          <div className='flex flex-row gap-2 items-center justify-center'>
            <Label className='font-bold text-xl'>email:-</Label>
          <TextInput
           name='email'
           onChange={handleChange}
          className=''/>
          </div>


          <div className='flex flex-row gap-2 items-center justify-center'>
            <Label className='font-bold text-xl'>phoneNumber:-</Label>
          <TextInput
           name='phoneNumber'
           onChange={handleChange}
          
          className=''/>
          </div>
         

          <div className='flex flex-row gap-2 items-center justify-center'>
            <Label className='font-bold text-xl'>address:-</Label>
          <TextInput
           name='address'
           onChange={handleChange}
          className=''/>
          </div>
         
          <Button color='failure'  type='submit'>
                Add student
              </Button>
              <Button color='gray' onClick={() => setShowStudentModal(false)}>
                No, cancel
              </Button>
            </form>
           
           { error && (

          <p>{error}</p>
           )}
          </div>
        </Modal.Body>
      </Modal>







    </div>
  )
}

export default DashStudent
