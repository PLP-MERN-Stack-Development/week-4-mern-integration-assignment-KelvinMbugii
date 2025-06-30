import React from "react";
import { Link } from "react-router-dom";
import PostList from "../components/Posts/PostList";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Posts</h1>
        <Link
          to="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Create Post
        </Link>
      </div>
      <PostList />
    </div>
  );
}
