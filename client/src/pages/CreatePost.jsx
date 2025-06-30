import PostForm from "../components/Posts/PostForm";
import { useNavigate } from "react-router-dom";
import useCreatePost from "../hooks/useCreatePost";
import { useState, useEffect } from "react";
import { useCategoriesContext } from "../contexts/CategoriesContext";
import { categoryService } from "../services/api"; 
import defaultCategories from "../data/Category";

export default function CreatePost() {

  const { dispatch } = useCategoriesContext();
  const navigate = useNavigate();
  const { createPost } = useCreatePost();
  const [categories, setCategories] = useState([]);
  const { state } = useCategoriesContext();
 

  useEffect(() => {
    async function fetchCategories() {
      dispatch({ type: "SET_LOADING" });
      try {
        const data = await categoryService.getAllCategories();
        if( data && data.length > 0){
        dispatch({ type: "SET_CATEGORIES", payload: data });
        setCategories(data);
        }else{
          const fallback = defaultCategories.map((name) => ({ name }));

          setCategories(fallback);
          dispatch({ type: "SET_CATEGORIES", payload: fallback})
        }
      } catch (error) {
        
        const fallback = defaultCategories.map((name) => ({ name }));
        
        setCategories(fallback);
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    }

    fetchCategories();
  }, [dispatch]);


  const handleSubmit = async (data) => {

    const user = JSON.parse(localStorage.getItem("user"));
  
    const newPost = {
      title: data.title,
      content: data.content,
      category: data.category, 
      slug: data.title.toLowerCase().replace(/\s+/g, "-"),
      author: user?._id,
    };

    const result = await createPost(newPost);

    if (result.success) {
      alert("Post created successfully");
      navigate("/");
    } else {
      alert("Failed to create post: " + result.error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className = "max-w-2xl mx-auto py-8 px-4">
      <h1 className = "text-2xl font-semibold mb-6">Create Post</h1>
      <PostForm onSubmit={handleSubmit} onCancel={handleCancel} categories = {categories}/>
    </div>
  );
}
