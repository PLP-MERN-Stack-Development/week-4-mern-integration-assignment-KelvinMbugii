import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import { categoryService } from "../../../services/api";

export default function CategoryManager() {
  const handleAddCategory = async (data) => {
    try {
      await categoryService.createCategory(data); 
      
    } catch (err) {
      console.error("Failed to add category:", err.message);
    }
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <CategoryForm onSubmit={handleAddCategory} />
      <CategoryList />
    </div>
  );
}
