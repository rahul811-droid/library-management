import React, { useState } from 'react'
import {Button,Label,Spinner} from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
const Signup = () => {

const [formData,setFormData] = useState({
  libraryname:'',
  username:'',
  email:'',
  password:''

})
const [errorMessage,setErrorMessage] = useState(null);
const [loading,setLoading] = useState(false);

const navigate = useNavigate()

const handleChange=(e)=>{
  setFormData({...formData,[e.target.id]:e.target.value})
}


const handleSubmit = async(e)=>{
  e.preventDefault();
  
  try {
    setLoading(true);
    setErrorMessage(null);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success == false){
return setErrorMessage(data.message);
    }
    if(res.ok){
      navigate('/signin')
    }
  } catch (error) {
    console.log(error);
    setErrorMessage(error.message);
    setLoading(false);
  }
  console.log(formData)

}
  return (

    <div className='w-[500px] p-5  shadow-lg border-yellow-950 mx-auto mt-20  '>
        <h1 className='text-center font-bold text-2xl'>Signup</h1>

        <form onSubmit={handleSubmit}  className='mt-5 flex flex-col gap-2'>
            <div className='flex gap-5 justify-center'>
                <label  className='text-xl w-screen font-semibold'>Libraryname : -</label>
                <input type="text"
                 placeholder='libraryname...'
                  className=' border p-1 text-xl rounded-md'
                 id='libraryname'
                 value={formData.libraryname}
                 onChange={handleChange}
                  />

            </div>

            <div className='flex gap-5 justify-center'>
                <label  className='text-xl font-semibold w-screen'>Username : -</label>
                <input type="text" placeholder='username...'
                id='username'
                value={formData.username}
                className='border p-1 text-xl rounded-md'
                onChange={handleChange}
                />
 
            </div>

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
                'Sign Up'
              )}

          </button>
     


        </form>

      <p className='mt-5 pb-2 text-center' >Already have an account?<span ><Link to={'/signin'} className='font-semibold text-[red]'>Login</Link></span></p>

    </div>
  )
}

export default Signup
