function DeleteProjectModal({
    open,
    projectTitle,
    onCancel,
    onDelete,
  }) {
  
    if (!open) return null;
  
    return (
  
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
  
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
  
          <h2 className="text-2xl font-bold">
            Delete Project
          </h2>
  
          <p className="mt-4 text-gray-600">
            Are you sure you want to delete
            <strong> "{projectTitle}"</strong>?
          </p>
  
          <p className="mt-2 text-red-500 text-sm">
            Projects with pending or accepted applications
            cannot be deleted.
          </p>
  
          <div className="flex justify-end gap-3 mt-8">
  
            <button
              onClick={onCancel}
              className="border px-5 py-2 rounded-xl"
            >
              Cancel
            </button>
  
            <button
              onClick={onDelete}
              className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700"
            >
              Delete
            </button>
  
          </div>
  
        </div>
  
      </div>
  
    );
  
  }
  
  export default DeleteProjectModal;