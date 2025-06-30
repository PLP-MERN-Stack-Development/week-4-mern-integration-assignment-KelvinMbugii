import React from "react";
import { useForm } from "react-hook-form";

export default function CategoryForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const submitHandler = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} style={{ maxWidth: 300 }}>
      <div>
        <label>Category Name</label>
        <input
          {...register("name", { required: "Category name is required" })}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        style={{ marginTop: "1rem" }}
      >
        Add Category
      </button>
    </form>
  );
}
