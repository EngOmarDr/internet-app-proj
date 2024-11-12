// components/Page.jsx
import { useEffect, useState } from 'react';
import { getUsers } from '../../services/users';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../LoadingSpinner';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers(query, page);
        setUsers(data.data);
        setMeta(data.meta);
      } catch (err) {
        const errorMessage = 
          err.response && err.response.status === 401 
          ? 'Unauthorized access. Please check your credentials.'
          : 'Failed to fetch users';
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [query, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); 
    setQuery(e.target.query.value);
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-6">User List</h1>

      <form onSubmit={handleSearch} className="flex justify-center mb-4">
        <input
          type="text"
          name="query"
          placeholder="Search by username..."
          className="p-2 border border-gray-300 rounded-l-lg focus:outline-none"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition">
          Search
        </button>
      </form>

      {loading ? (
        <LoadingSpinner/>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {users.map((user) => (
              <div key={user.id} className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-50 transition-all">
                <h2 className="text-xl font-semibold mb-2">{user.username}</h2>
                <p className="text-gray-700">{user.email}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={meta.current_page === 1}
              className={`px-4 py-2 rounded-lg ${
                meta.current_page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-gray-100 rounded-lg">
              Page {meta.current_page} of {meta.last_page}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, meta.last_page))}
              disabled={meta.current_page === meta.last_page}
              className={`px-4 py-2 rounded-lg ${
                meta.current_page === meta.last_page
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
