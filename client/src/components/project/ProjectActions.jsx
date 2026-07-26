function ProjectActions({
    onManage,
    onEdit,
    onDelete,
  }) {
    return (
      <div className="grid grid-cols-3 gap-3 mt-6">
  
        <button
          onClick={onManage}
          className="border rounded-xl py-2 hover:bg-gray-100 transition"
        >
          👥 Manage
        </button>
  
        <button
          onClick={onEdit}
          className="border rounded-xl py-2 hover:bg-indigo-50 transition"
        >
          ✏ Edit
        </button>
  
        <button
          onClick={onDelete}
          className="border border-red-300 text-red-600 rounded-xl py-2 hover:bg-red-50 transition"
        >
          🗑 Delete
        </button>
  
      </div>
    );
  }
  
  export default ProjectActions;