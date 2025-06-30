import React, { useEffect } from "react";
import { useCategoriesContext } from "../../../contexts/CategoriesContext";
import { categoryService } from "../../../services/api";

export default function CategoryList() {
  const { state, dispatch } = useCategoriesContext();
  const { categories, loading, error } = state;

  useEffect(() => {
    async function fetchCategories() {
      dispatch({ type: "SET_LOADING" });
      try {
        const data = await categoryService.getAllCategories();
        dispatch({
          type: "SET_CATEGORIES",
          categories: data.categories || data,
        });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    }
    fetchCategories();
  }, [dispatch]);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!categories.length) return <p>No categories found.</p>;

  return (
    <ul>
      {categories.map((cat) => (
        <li key={cat._id || cat.id }>{cat.name}</li>
      ))}
    </ul>
  );
}
