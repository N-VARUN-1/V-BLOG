import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import {useSelector} from 'react-redux';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {currentUser} = useSelector((state)=>state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div className=''>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        {
          currentUser ? <h1 className='animate__animated animate__bounce animate__repeat-2 text-3xl font-bold lg:text-6xl'>Welcome to {currentUser.username}'s Blog</h1>
          : <h1 className='animate__animated animate__bounce animate__repeat-2 text-3xl font-bold lg:text-6xl'>Welcome to V-Blog</h1>
        }
        <p className='animate__animated animate__bounceIn animate__repeat-1 text-gray-500 text-xs sm:text-sm '>
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
      <div className='animate__animated animate__fadeInUp animate__repeat-1 p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='animate__animated animate__zoomIn animate__repeat-1 max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}