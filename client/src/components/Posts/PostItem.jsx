export default function PostItem({ post, onEdit, onDelete }) {
  return (
    <div className="border border-gray-200 p-4 rounded-xl shadow-sm bg-white mb-4">
      <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
      <p className="text-gray-700 mt-2">{post.content.slice(0, 150)}...</p>
      <small className="block text-sm text-gray-500 mt-2">
        Category: {post.category}
      </small>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => onEdit(post)}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(post.id)}
          className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
