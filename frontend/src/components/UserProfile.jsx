import { Button, Label, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';



const UserProfile = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('id');
  const [printMes,setPrintMes] = useState(null);
  const [originalStudent,setOriginalStudent] = useState('');

    const [selectUser,setSelectUser] = useState({});
     const [error,setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/auth/getuser/${userId}`)
        const data = await res.json();
        console.log(data); // Log the entire response

        if (res.ok) {
          setSelectUser(data)

        }
     

      } catch (error) {
        console.log(error.message);
      }
    }

  if(userId){
    fetchUser();
  }
   

  }, [userId])


  const handleOnchange = (e)=>{
    setSelectUser({...selectUser,[e.target.id]:e.target.value})
   }



   const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
   if (Object.keys(selectUser).length === 0) {
      setError('No changes made')
      console.log('No changes made')
      return;
    }
    
    console.log(error)

  
    try {
      const res = await fetch(`/api/auth/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectUser),
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
  
  console.log(selectUser);
  

  return (
    <div className='items-center mx-auto mt-10'>
      <h1 className='text-xl font-bold'>Student Profile</h1>
      <hr />

    <img src={selectUser.profileprofilePicture} alt="profile-Picture" 
      className='mt-5 h-12 rounded-lg '
    />
      <form  onSubmit={handleUpdate} className='flex flex-col gap-3'>

    <div className='flex  gap-5'>
      <Label className='font-semibold text-xl'>LibraryName:-</Label>
    <input className='rounded-lg text-center px-1'
    value={selectUser.libraryname}
    onChange={handleOnchange}
    id='libraryname'
    />
    </div>
     

    <div className='flex  gap-5'>
      <Label className='font-semibold text-xl'>UserName:-</Label>
    <input className='rounded-lg text-center px-1'
    value={selectUser.username}
    onChange={handleOnchange}
    id='username'
    />
    </div>

    <div className='flex  gap-5'>
      <Label className='font-semibold text-xl'>email:-</Label>
    <input className='rounded-lg text-center px-1'
    value={selectUser.email}
    onChange={handleOnchange}
    id='email'
    />
    </div>

    <div className='flex  gap-5'>
      <Label className='font-semibold text-xl'>Password:-</Label>
    <input className='rounded-lg text-center px-1'
    value={selectUser.password}
    onChange={handleOnchange}
    id='password'
    placeholder='*********'
    />
    </div>

   




  


<Button type='submit'>Update User</Button>
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

export default UserProfile
