import React, { useEffect, useState } from 'react';
import PostForm from '../components/Posts/PostForm';
import { postService } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      try {
        const data = await postService.getPost(id);
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      await postService.updatePost(id, updatedData);
      navigate('/');
    } catch (err) {
      alert('Failed to update post: ' + err.message);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading)
    return (
      <p className="text-blue-500 text-center mt-8 font-medium">
        Loading post data...
      </p>
    );

  if (error)
    return (
      <p className="text-red-500 text-center mt-8 font-semibold">
        Error: {error}
      </p>
    );

  if (!post)
    return (
      <p className="text-gray-600 text-center mt-8 font-medium">
        Post not found.
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Post</h1>
      <PostForm
        initialData={post}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
