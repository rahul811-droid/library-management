import React, { useEffect, useState } from 'react'
import { Modal, Table, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const DashLibrary = () => {

  const { currentUser } = useSelector((state) => state.user);

  const [users, setUsers] = useState({});
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');


  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/auth/getalluser`)
        const data = await res.json();
        console.log(data); // Log the entire response

        if (res.ok) {
          setUsers(data.users);

        }
        console.log(data)

      } catch (error) {
        console.log(error.message);
      }
    }

    fetchStudent();

  }, [currentUser._id])


  const userDelete = async()=>{
    try {
      const res = await fetch(`/api/auth/delete/${userIdToDelete}`,{
        method:'DELETE'
      });
      const data = await res.json();
      if(res.ok){
        setUsers((prev)=>prev.filter((user)=>user._id!==userIdToDelete));
        setShowModal(false);
      }
      else{
        console.log(data.message);

      }
    } catch (error) {
      console.log(error.message);

    }
}



console.log(users)
  return (
    <div className='table-auto overflow-x-scroll w-screen md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <Table hoverable className='shadow-md'>
        <Table.Head>
          <Table.HeadCell>Date created</Table.HeadCell>
          <Table.HeadCell>Library Name</Table.HeadCell>
          <Table.HeadCell>UserName</Table.HeadCell>
          <Table.HeadCell>Profile pic</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>

          <Table.HeadCell>Edit</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>

        {users && users.length > 0 && users.map((user) => (
  <Table.Body className='divide-y' key={user._id}>
    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
      <Table.Cell>
      {new Date(user.createdAt).toLocaleDateString()}

      </Table.Cell>
      

      <Table.Cell>
        {user.libraryname }
      </Table.Cell>


      <Table.Cell>
        {user.username }
      </Table.Cell>

      <Table.Cell>
       <img src={user.profilePicture} alt={`${user.username} profile`}                   className='w-10 h-10 object-cover bg-gray-500 rounded-full'
 />
      </Table.Cell>

      <Table.Cell>
        {user.email }
      </Table.Cell>


      <Table.Cell className='font-medium text-green-500 hover:underline cursor-pointer'
              >
                     <Link to={`/dashboard?tab=user-profile&id=${user._id}`}>
                     <p>Edit</p></Link>


               
              </Table.Cell>

              <Table.Cell>
               <span 
               onClick={()=>{setShowModal(true) ;
              setUserIdToDelete(user._id)
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
              Are you sure you want to delete this user?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={userDelete}>
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

export default DashLibrary
