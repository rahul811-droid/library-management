import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { toggleTheme } from '../redux/theme/themeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';

const Header = () => {

  const path = useLocation().pathname;
  const location = useLocation();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate(); // To navigate on logout

  // console.log(currentUser)
  const dispatch = useDispatch();
  

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
      }
    } catch (error) {
      console.log(error.message);
    }
    
    }


  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "profile") {
      navigate("/profile");
    } else if (selectedValue === "dash") {
      // Handle logout logic here, then navigate
      navigate("/dashboard");
     
     
    }
    else{
      handleSignOut();
    }
  };


  return (
    <div className='flex flex-wrap sticky justify-between items-center p-4 h-20 shadow-lg '>
      <h1 className='font-semibold text-2xl'>Logo</h1>

      <form className='flex-grow max-w-sm lg:max-w-lg'>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>


      {/* <nav className='hidden md:flex'> */}
        <ul className='flex gap-5 font-semibold text-red-950'>
          <li><Link>Home</Link></li>
          <li><Link>About</Link></li>
          <li><Link>Services</Link></li>
          <li><Link>Contact</Link></li>
        
        </ul>
      {/* </nav> */}

      <div className='flex gap-2 md:order-2'>

      <Button
        className='w-12 h-10 hidden sm:inline-flex'
        color='gray'
        pill
        onClick={() => dispatch(toggleTheme())}
      >
        {theme === 'light' ? <FaSun /> : <FaMoon />}
      </Button>
      
 
      {currentUser ? (
        <select name="userOptions" id="userOptions" onChange={handleSelectChange}>
         
          <option value="username" className='font-semibold text-green-50'>{currentUser.username}</option>
          <option value="dash">Dashboard</option>
          <option value="profile">Profile</option>
          <option value="logout" onClick={handleSignOut}>Logout</option>
        </select>
     ) : (
        <Link to="/signin">
          <Button gradientDuoTone="purpleToBlue" outline>Sign In</Button>
        </Link>
      )} 


    </div>
    </div>
  );
};

export default Header;
