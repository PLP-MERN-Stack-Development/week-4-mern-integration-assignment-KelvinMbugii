import React, { useEffect } from "react";
import PostItem from "./PostItem";
import { usePostsContext } from "../../contexts/PostsContext";
import { postService } from "../../services/api";

export default function PostList({ onEdit }) {
  const { state, dispatch} = usePostsContext();
  const { posts, loading, error } = state;

  useEffect(() => {
    async function fetchPosts() {
      dispatch({ type: "LOADING" });
      try {
        const data = await postService.getAllPosts();
        dispatch({ type: "SET_POSTS", posts: data.posts || data });
      } catch (err) {
        dispatch({ type: "ERROR", error: err.message });
      }
    }
    fetchPosts();
  }, [dispatch]);

  const handleDelete = async (id) => {
    dispatch({ type: "LOADING" });
    try {
      await postService.deletePost(id);
      dispatch({ type: "DELETE_POST", id });
    } catch (err) {
      dispatch({ type: "ERROR", error: err.message });
    }
  };

  if (loading)
    return (
      <p className="text-blue-500 text-center mt-6 font-medium">
        Loading posts...
      </p>
    );

  if (error)
    return (
      <p className="text-red-500 text-center mt-6 font-semibold">
        Error: {error}
      </p>
    );

  if (!posts || !posts.length === 0)
    return (
      <p className="text-gray-600 text-center mt-6 font-medium">
        No posts found.
      </p>
    );

  return (
    <div className="space-y-4 mt-6">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
