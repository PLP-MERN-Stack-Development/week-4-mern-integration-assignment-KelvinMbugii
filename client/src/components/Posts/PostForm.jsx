import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import defaultCategories from "../../data/Category";
import { useCategoriesContext } from "../../contexts/CategoriesContext";

export default function PostForm({ initialData = {}, onSubmit, onCancel, categories = [] }) {
  const { state } = useCategoriesContext();
  //const categories = state?.categories.length ? state.categories : [];

  const contextCategories = state?.categories.length
    ? state.categories
    : categories;

  const fallbackCategories = defaultCategories.map((name, index) => ({
    name,
    _id: `default-${index}`,
  }));
   
  const finalCategories = categories.length ? categories : fallbackCategories;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0)
      reset(initialData);
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <textarea
          rows={6}
          {...register("content", {
            required: "Content is required",
            minLength: {
              value: 10,
              message: "Content must be at least 10 characters",
            },
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          {...register("category", { required: "Category is required" })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {initialData.id ? "Update Post" : "Create Post"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
