const defaultCategories = [
    "Technology",
    "Health",
    "Finance",
    "Education",
    "Travel",
    "Sports",
    "Entertainment",
    "Science"
  ];
  
  function isValidCategory(category) {
    return defaultCategories.includes(category);
  }
  
  export { defaultCategories as default, isValidCategory };