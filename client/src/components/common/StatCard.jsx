function StatCard({ title, value }) {
    return (
      <div className="bg-white shadow rounded-2xl p-6">
        <h3 className="text-gray-500 text-sm">{title}</h3>
  
        <h2 className="text-4xl font-bold mt-2 text-indigo-600">
          {value}
        </h2>
      </div>
    );
  }
  
  export default StatCard;