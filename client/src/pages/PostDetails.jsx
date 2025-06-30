import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postService } from "../services/api";

export default function PostDetails() {
  const { id } = useParams();
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

  if (loading)
    return <p className="text-center text-gray-500 mt-8">Loading post...</p>;
  if (error)
    return <p className="text-center text-red-600 mt-8">Error: {error}</p>;
  if (!post)
    return <p className="text-center text-gray-500 mt-8">Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>
      <p className="text-sm text-gray-500 italic mb-6">
        Category: <span className="text-blue-600">{post.category}</span>
      </p>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {post.content}
      </p>
      {/* Optional: Add edit/delete buttons or comment section here */}
    </div>
  );
}
