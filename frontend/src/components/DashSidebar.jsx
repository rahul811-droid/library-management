import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
const DashSidebar = () => {


  const { currentUser, error, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState('');

 
  return (
    <div className=' flex flex-col mt-5 h-screen gap-3 w-[200px]  border-r-2 shadow-md'>
      <h1 className='font-bold text-2xl text-center border-b-2 shadow-md'>Dashboard</h1>
      
      <div className='ml-5 text-xl text-green-400'>
     
     <Link to={'/dashboard?tab=student'}><p>Student details</p></Link>

      {currentUser.isAdmin && (
        <Link to={'/dashboard?tab=library-details'}><p>Library Details</p></Link>
      )}


      </div>


     
      
    </div>
  )
}

export default DashSidebar
