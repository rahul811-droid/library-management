import React from 'react'
import DashSidebar from '../components/DashSidebar'
import DashStudent from '../components/DashStudent'
import { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashLibrary from '../components/DashLibrary'
import StudentProfile from '../components/StudentProfile'
import UserProfile from '../components/userProfile'
import { useSelector } from 'react-redux'
const Dashboard = () => {


  const { currentUser } = useSelector((state) => state.user);

  const location = useLocation();
  const [tab,setTab] = useState(' ');

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
if(tabFromUrl){
  setTab(tabFromUrl) ;
}
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
     <div className="md:w-56">
    {/* {sidebar } */}
    <DashSidebar/>
     </div>

    {tab === 'student' && <DashStudent/>}
    {currentUser.isAdmin &&  tab === 'library-details' && <DashLibrary/>}
   
    {tab === 'student-profile' && <StudentProfile/>}
    {tab === 'user-profile' && <UserProfile/>}

    </div>
  )
}

export default Dashboard
