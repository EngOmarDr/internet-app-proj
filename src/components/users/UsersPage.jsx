// components/Page.jsx
import { useEffect, useState } from "react";
import { getUsers } from "../../services/users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../LoadingSpinner";
import { useTranslation } from "react-i18next";
import UserOperations from "./UserOperations";
import GroupOperations from "./GroupOperations";

const UsersPage = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers(query); // لم يعد هناك page
        setUsers(data.data);
      } catch (err) {
        const errorMessage =
          err.response && err.response.status === 401
            ? t("unauthorized_access")
            : t("fetch_users_error");
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [query, t]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.query.value);
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-6">{t("user_list")}</h1>

      <form onSubmit={handleSearch} className="flex justify-center mb-4">
        <input
          type="text"
          name="query"
          placeholder={t("search_placeholder")}
          className="p-2 border border-gray-300 rounded-l-lg focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition"
        >
          {t("search_button")}
        </button>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-50 transition-all"
            >
              <h2 className="text-xl font-semibold mb-2">{user.username}</h2>
              <p className="text-gray-700">{user.email}</p>
            </div>
          ))}
        </div>
      )}

      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            User Operations Viewer
          </h1>
          {/* تمرير قيم المجموعة والمستخدم */}
          <UserOperations groupId={1} userId={4} />
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <GroupOperations groupId={1} userId={1} />
    </div>
    </div>
  );
};

export default UsersPage;
