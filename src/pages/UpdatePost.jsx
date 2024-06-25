import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {app} from '../firebase.js'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProg, setImageUploadProg] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    
    const {postId} = useParams();

    const navigate = useNavigate();

    const {currentUser} = useSelector((state)=>state.user);

    useEffect(()=>{
        try{
            const fetchPost = async () => {
                const res = await fetch(`/api/post/getPosts?postId=${postId} `);
                const data = await res.json();
                if(!res.ok){
                    console.log(error.message);
                    setPublishError(data.message);
                    return;
                }
                if(res.ok){
                    setPublishError(null);
                    setFormData(data.posts[0]);
                }
            };
            fetchPost();
        }catch(error){
            console.log(error.message);
        }
    }, [postId]);
    
    const handleUploadImage = async () => {
        try{
            if(!file){
                setImageUploadError('Please select an Image');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = 
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setImageUploadProg(progress.toFixed(0));
                },
                (error)=>{
                    setImageUploadError('Image uploading failed');
                    setImageUploadProg(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        setImageUploadProg(null);
                        setImageUploadError(null);
                        setFormData({...formData, image: downloadURL});
                    });
                }
            );
        }catch(error){
            setImageUploadError('Image uploading failed');
            setImageUploadProg(null);
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch(`/api/post/updatePosts/${formData._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if(!res.ok){
                setPublishError(data.message);
                return
            }
            if(res.ok){
                setPublishError(null);
                navigate(`/post/${data.slug}`);
            }
        }catch(error){
            setPublishError('Failed to update post');
        }
    }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-bold'>update a post</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput 
                type='text' 
                placeholder='Title required' 
                required id='title' 
                className='flex-1' 
                onChange={
                    (e)=>setFormData({...formData, title: e.target.value})
                } 
                value={formData.title}/>
                <Select 
                onChange={(e)=>setFormData({...formData, category: e.target.value})} 
                value={formData.category}>
                    <option value="Uncategorized">Select a category</option>
                    <option value="Javascript">Javascript</option>
                    <option value="ReactJs">ReacJs</option>
                    <option value="NextJs">NextJs</option>
                </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])} />
                <Button 
                type='button' 
                gradientDuoTone='purpleToBlue' 
                size='sm' 
                outline 
                onClick={handleUploadImage} disabled={imageUploadProg}>
                {
                    imageUploadProg ? (
                    <div className='w-16 h-16'>
                        <CircularProgressbar value={imageUploadProg} text = {`${imageUploadProg || 0}%`} />
                    </div>
                    ) : ('Upload Image')
                }
                </Button>
            </div>
            {imageUploadError && (
                <Alert color='failure'>
                    {imageUploadError}
                </Alert>
            )}
            {formData.image && (
                <img src={formData.image} alt='Uploaded Image' className='w-full h-72 object-cover'/>
            )}
            <ReactQuill value={formData.content} theme="snow" placeholder='Write something...' className='h-72 mb-12 dark:text-white-500' required onChange={(value)=>setFormData({...formData, content: value})}/>
            <Button type='submit' gradientDuoTone='purpleToBlue'>Update</Button>
            {publishError && (
                <Alert className='mt-5' color='failure'>{publishError}</Alert>
            )}
        </form>
    </div>
  )
}