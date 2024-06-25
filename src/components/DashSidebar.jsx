import { Sidebar } from 'flowbite-react';
import {HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser} from 'react-icons/hi';
import React from 'react';
import { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom'
import { signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location.search]);

    const handleSignOut = async (e) => {
      try{
        const res = await fetch('/api/user/sign-out', {
          method: 'POST', 
        });

        const data = await res.json();
        if(!res.ok){
          console.log(data.message);
        }else{
          dispatch(signOutSuccess());
          navigate('/sign-in');
        }
      }catch(error){
        console.log(error.message)
      }
    }

  return (
    <div className='animate__animated animate__fadeInLeft animate__repeat-1'>
      <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
              {
                currentUser && currentUser.isAdmin && (
                  <Link to='/dashboard?tab=dash'>
                    <Sidebar.Item
                    active={tab==='dash' || !tab}
                    icon={HiChartPie}
                    as='div'
                    >
                      DashBoard
                    </Sidebar.Item>
                  </Link>
                )
              }
                <Link to={'/dashboard?tab=profile'}>
                    <Sidebar.Item active={tab==='profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as='div'>
                        Profile
                    </Sidebar.Item>
                </Link>
                {currentUser.isAdmin && (
                  <Link to='/dashboard?tab=posts'>
                    <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText}>
                      Posts
                    </Sidebar.Item>
                  </Link>
                )}
                {currentUser.isAdmin &&  (
                  <>
                    <Link to='/dashboard?tab=users'>
                      <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup}>
                        Users
                      </Sidebar.Item>
                    </Link>
                    <Link to='/dashboard?tab=comments'>
                      <Sidebar.Item active={tab === 'comments'} icon={HiAnnotation}>
                        Comments
                      </Sidebar.Item>
                    </Link>
                  </>
                )}
                
                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      {/* <h1>Dashsidebar</h1> */}
    </div>
  )
}
