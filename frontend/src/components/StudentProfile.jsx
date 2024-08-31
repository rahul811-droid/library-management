import { Button, Label, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';



const StudentProfile = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studentId = queryParams.get('id');
  const [printMes,setPrintMes] = useState(null);
const [originalStudent,setOriginalStudent] = useState('');

    const [selectStudent,setSelectStudent] = useState({});
const [error,setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/student/getone/${studentId}`)
        const data = await res.json();
        console.log(data); // Log the entire response

        if (res.ok) {
          setSelectStudent(data)

        }
     

      } catch (error) {
        console.log(error.message);
      }
    }

  if(studentId){
    fetchStudent();
  }
   

  }, [studentId])


  const handleOnchange = (e)=>{
    setSelectStudent({...selectStudent,[e.target.id]:e.target.value})
   }



   const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
   if (Object.keys(selectStudent).length === 0) {
      setError('No changes made')
      console.log('No changes made')
      return;
    }
    
    console.log(error)

  
    try {
      const res = await fetch(`/api/student/update/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectStudent),
      });
      const data = await res.json();
  
      if (!res.ok) {
        setError(data.message);
        setTimeout(() => {
          setError('');
        }, 1000);
      } else {
        setPrintMes('Student data updated successfully');
        setTimeout(() => {
          setPrintMes('');
        }, 1000);
        console.log('data updated successfully');
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError('');
      }, 1000);
    }
  };
  
  console.log(selectStudent);
  
  console.log(selectStudent)

  return (
    <div className='items-center mx-auto mt-10'>
      <h1 className='text-xl font-bold'>Student Profile</h1>
      <hr />

    <img src={selectStudent.profileprofilePicture} alt="profile-Picture" 
      className='mt-5 h-12 rounded-lg '
    />
      <form  onSubmit={handleUpdate} className='flex flex-col gap-3'>

    <div className='flex  gap-5'>
      <Label className='font-semibold text-xl'>firstName:-</Label>
    <input className='rounded-lg text-center px-1'
    value={selectStudent.firstName}
    onChange={handleOnchange}
    id='firstName'
    />
    </div>
     

    <div className='flex  gap-5'>
      <Label className='font-semibold text-xl'>lastName:-</Label>
    <input className='rounded-lg text-center px-1'
    value={selectStudent.lastName}
    onChange={handleOnchange}
    id='lastName'
    />
    </div>

    <div className='flex  gap-5'>
      <Label className='font-semibold text-xl'>email:-</Label>
    <input className='rounded-lg text-center px-1'
    value={selectStudent.email}
    onChange={handleOnchange}
    id='email'
    />
    </div>


    <div className='flex  gap-5'>
      <Label className='font-semibold text-xl'>AdharcardNo:-</Label>
    <input className='rounded-lg text-center px-1'
    value={selectStudent.AdharcardNo}
    onChange={handleOnchange}
    id='AdharcardNo'
    />
    </div>


    <div className='flex  gap-5'>
      <Label className='font-semibold text-xl'>phoneNumber:-</Label>
    <input className='rounded-lg text-center px-1'
    value={selectStudent.phoneNumber}
    onChange={handleOnchange}
    id='phoneNumber'
    />
    </div>


    <div className='flex gap-5 items-center'>
  <Label className='font-semibold text-xl'>Address:</Label>
  {selectStudent?.address && selectStudent.address.length > 0 ? (
    <input 
      className='rounded-lg text-center px-1' 
      value={`${selectStudent.address[0].street || ''}, ${selectStudent.address[0].city || ''}, ${selectStudent.address[0].state || ''}, ${selectStudent.address[0].country || ''}, ${selectStudent.address[0].postalCode || ''}`} 
      readOnly 
    id='address'
      onChange={handleOnchange}
    />
  ) : (
    <input 
      className='rounded-lg text-center px-1' 
      value="No address available" 
      readOnly 
    />
  )}
</div>


<Button type='submit'>Update student</Button>
      </form>
      {printMes && (
        <p>{printMes}</p>
      )}


      {error && (
        
          <p>{error}</p>
      )}
    </div>
  )
}

export default StudentProfile
