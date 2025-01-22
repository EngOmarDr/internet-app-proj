/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchUserOperations } from '../../services/users';

const UserOperations = ({ groupId, userId }) => {
  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOperations = async () => {
      setLoading(true);
      try {
        const data = await fetchUserOperations(groupId, userId);
        setOperations(data.data);
      } catch (err) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    loadOperations();
  }, [groupId, userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-blue-600 font-semibold">Loading user operations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
<div className="p-6 bg-gray-100 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">User Operations</h2>
  {operations.length === 0 ? (
    <p className="text-gray-600 text-center">No operations found for this user.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="table-auto w-full bg-white shadow-md rounded-md overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">File</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Size (KB)</th>
            <th className="px-4 py-2">Version</th>
            <th className="px-4 py-2">Change</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {operations.map((operation) => (
            <tr key={operation.id} className="text-center border-b">
              <td className="px-4 py-2">{operation.file || 'N/A'}</td>
              <td className="px-4 py-2">{operation.type || 'N/A'}</td>
              <td className="px-4 py-2">{(operation.size / 1024).toFixed(2)}</td>
              <td className="px-4 py-2">{operation.Version_number || 'N/A'}</td>
              <td className="px-4 py-2">{operation.change || 'N/A'}</td>
              <td className="px-4 py-2">{operation.created_at || 'N/A'}</td>
              <td className="px-4 py-2">{operation.updated_at || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
  );
};

export default UserOperations;
