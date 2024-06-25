import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {FaThumbsUp} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {Button, Textarea} from 'flowbite-react';

export default function Comment({comment, onLike, onEdit, onDelete}) {
  const {currentUser} = useSelector((state)=>state.user);
    const [user, setUser] = useState({});
    const [isEdit, setEdit] = useState(false);  
    const [editedContent, setEditedContent] = useState(comment.content);
    useEffect(()=>{
        const getUser = async  () => {
            try{
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if(res.ok){
                    setUser(data);
                }
            }catch(error){
                console.log(error.message );
            }
        }
        getUser();
    }, [comment]);

  const handleEdit = () => {
    setEdit(true);
    setEditedContent(comment.content);
  }

  const handleSave = async() => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: editedContent})
      });
      if(res.ok){
        setEdit(false); 
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm gap-2'>
      <div className='flex shrink-0 mr-3'>
        <img className='w-10 h-10 rounded-full bg-gray-200 ' src={user.profilePicture} alt={user.username} />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
            <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}` : "anonymous user"}</span>
            <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
        </div>
        {isEdit ? (
          <>
            <Textarea
            className='mb-2'
            value={editedContent}
            onChange={(e)=>setEditedContent(e.target.value)}
            />
            <div className='flex justify-end gap-2 text-xs'>
              <Button type='button' size='sm' gradientDuoTone='greenToBlue' onClick={handleSave}>
                Save
              </Button>
              <Button type='button' size='sm' gradientDuoTone='greenToBlue' outline onClick={()=>setEdit(false)}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
              <p className='text-gray-500 pb-2 dark:text-white'>{comment.content}</p>
              <div className='flex items-center pt-2 text-sm border-t dark:border-gray-700 mx-w-fit gap-2 '>
                <button type='button' onClick={() => onLike(comment._id)} className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}>
                  <FaThumbsUp className='text-sm' />
                </button>
                <p className='text-gray-400'>
                  {comment.numOfLikes > 0 && comment.numOfLikes + " " + (comment.numOfLikes === 1 ? "Like" : "likes")}
                </p>
                {
                  currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                    <>
                      <button type='button' className='text-gray-400 hover:text-blue-500' onClick={handleEdit}>
                        Edit
                      </button>
                      <button type='button' className='text-gray-400 hover:text-red-500' onClick={()=>onDelete(comment._id)}>
                        Delete
                      </button>
                    </>
                  )
                }
              </div>
        </>
        )}
        
      </div>
    </div>
  )
}
