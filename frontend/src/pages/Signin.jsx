import React, { useState } from 'react'
import {Alert, Button,Label,Spinner} from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart ,signInFailure,signInSuccess} from '../redux/user/userSlice'
const Signin = () => {

const [formData,setFormData] = useState({
  email:'',
  password:''
})
const {loading,error:errorMessage} = useSelector(state=>state.user)

const navigate = useNavigate()
const dispatch = useDispatch() ;


const handleChange=(e)=>{
  setFormData({...formData,[e.target.id]:e.target.value})
}

const handleSubmit = async (e) => {
  e.preventDefault();
  if ( !formData.email || !formData.password) {
    return dispatch(signInFailure('Please fill out all fields'));
  }
  try {
   dispatch(signInStart());
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();

    if (data.success === false) {
    dispatch(signInFailure(data.message))
    }
    
    if (res.ok) {
      dispatch(signInSuccess(data))
      navigate('/dashboard');
    }
  } catch (error) {
  
  dispatch(signInFailure(error.message))
  }

}



  return (

    <div className='w-[500px] p-5  shadow-lg border-yellow-950 mx-auto mt-20  '>
        <h1 className='text-center font-bold text-2xl'>SignIn</h1>

        <form onSubmit={handleSubmit}  className='mt-5 flex flex-col gap-2'>
           

          

            <div className='flex gap-5 justify-center'>
                <label  className='text-xl font-semibold w-screen'>email : -</label>
                <input type="email" placeholder='email...' 
                id='email'
                value={formData.email}
                onChange={handleChange}
                className='border p-1 text-xl rounded-md'/>

            </div>

            <div className='flex gap-5 justify-center'>
                <label  className='text-xl font-semibold w-screen'>password : -</label>
                <input type="password"
                id='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='password...' className='border p-1 text-xl rounded-md'/>

            </div>

          <button type='submit' className='font-bold border mt-5 w-[100px] mx-auto bg-slate-300 h-14 rounded-md '>

          {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3 text-center'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}

          </button>
     


        </form>

      <p className='mt-5 pb-2 text-center' >Already have an account?<span ><Link to={'/signup'} className='font-semibold text-[red]'>Signup</Link></span></p>
      {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
    </div>
  )
}

export default Signin
