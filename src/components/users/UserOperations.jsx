import React, { useEffect, useState } from 'react';
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
                setOperations(data.data); // استخراج العمليات من الاستجابة
            } catch (err) {
                setError(err.message || 'Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        loadOperations();
    }, [groupId, userId]);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">User Operations</h2>
            {operations.length === 0 ? (
                <p className="text-gray-600">No operations available for this user.</p>
            ) : (
                <ul className="space-y-4">
                    {operations.map(operation => (
                        <li key={operation.id} className="p-4 bg-white rounded-lg shadow">
                            <p><span className="font-bold">ID:</span> {operation.id}</p>
                            <p><span className="font-bold">Status:</span> {operation.status}</p>
                            <p><span className="font-bold">Date:</span> {operation.date}</p>
                            <p><span className="font-bold">Created At:</span> {operation.created_at}</p>
                            <p><span className="font-bold">Updated At:</span> {operation.updated_at}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserOperations;
