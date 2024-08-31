import { Alert, Button, Label, Modal, TextInput } from 'flowbite-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutSuccess, updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const Profile = () => {
  const { currentUser, error, loading } = useSelector(state => state.user);
 
const [formData,setFormData] = useState({}) 
const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
const [updateUserError, setUpdateUserError] = useState(null);
const [showModal, setShowModal] = useState(false);
const dispatch = useDispatch();
const navigate = useNavigate()
const handleOnchange = (e)=>{
 setFormData({...formData,[e.target.id]:e.target.value})
}


const handleSignOut = async()=>{


  try {
    const res = await fetch('/api/auth/signout',{
      method:"POST",
    });
    const data = res.json();
    if(!res.ok){
      console.log(data.message);
    }else{
      dispatch(signoutSuccess());
      navigate('/signin')
    }
  } catch (error) {
    console.log(error.message);
  }
  
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made')
      return;
    }


    try {
      dispatch(updateStart());
      const res = await fetch(`/api/auth/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      }
      else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess('Users profile updated successfully')

      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }


  }


  const handleDelete = async()=>{
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/auth/delete/${currentUser._id}`,{
        method:'DELETE'
      });
      const data = await res.json();
      console.log(data)
      if(!res.ok){
        dispatch(deleteUserFailure(data.message));
      }
      else{
        dispatch(deleteUserSuccess(data));

      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));

    }
  }


  return (
    <div className='w-[600px]  mt-10 mx-auto shadow-md border h-[500px] rounded-lg'>
      {currentUser && (
        <h1 className='text-2xl font-bold text-center mt-5'>{currentUser.username}</h1>
      )}

      <h2 className='text-xl text-center mt-2'>You can update your profile details</h2>

      <form className='mt-5 flex flex-col gap-5' onSubmit={handleUpdate}>
<div className='flex flex-row justify-center gap-3 items-center'>
<Label className='font-bold text-xl'>libraryname:-</Label>
<TextInput type='text'
  defaultValue={currentUser?.libraryname || ''}
  id='libraryname'
   className=''
   onChange={handleOnchange}
   />

</div>


<div className='flex flex-row justify-center gap-3 items-center'>
<Label className='font-bold text-xl'>username:-</Label>
<TextInput type='text'
  defaultValue={currentUser?.username || ''}
  id='username'
   onChange={handleOnchange}
   className=''
   />

</div>


<div className='flex flex-row justify-center gap-3 items-center'>
<Label className='font-bold text-xl'>email:-</Label>
<TextInput type='email'
  defaultValue={currentUser?.email || ''}
  id='libraryname'
   onChange={handleOnchange}
   className=''
   />

</div>


<div className='flex flex-row justify-center gap-3 items-center'>
<Label className='font-bold text-xl'>password:-</Label>
<TextInput type='password'
  placeholder='*******'
   id='password'
   onChange={handleOnchange}
   className=''
   />

</div>


      <button type='submit' className='border  mt-5 font-semibold text-2xl w-[150px] rounded-md mx-auto h-12 bg-red-300'>Update</button>
      </form>

      <div className='flex justify-between text-red-400 font-semibold px-10 mt-5 text-xl cursor-pointer'>

        <p className='' onClick={()=>setShowModal(true)}>DeleteYour Acoount?</p>
        <p onClick={handleSignOut}>Signout</p>
      </div>

      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}

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
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Profile
