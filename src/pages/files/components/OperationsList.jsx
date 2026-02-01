import React, { useEffect, useState } from 'react';
import { fetchOperations } from '../../../services/fileService';

const OperationsList = ({ groupId, fileId }) => {
    const [operations, setOperations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadOperations = async () => {
            setLoading(true);
            try {
                const data = await fetchOperations(groupId, fileId);
                setOperations(data.data.data); // استخراج العمليات من الاستجابة
            } catch (err) {
                setError(err.message || 'Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        loadOperations();
    }, [groupId, fileId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Operations List</h2>
            <ul>
                {operations.map(operation => (
                    <li key={operation.id}>
                        <p>ID: {operation.id}</p>
                        <p>User ID: {operation.user_id}</p>
                        <p>File ID: {operation.file_id}</p>
                        <p>Type: {operation.type}</p>
                        <p>Status: {operation.status}</p>
                        <p>Size: {operation.size}</p>
                        <p>Date: {operation.date}</p>
                        <p>Created At: {operation.created_at}</p>
                        <p>Updated At: {operation.updated_at}</p>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OperationsList;
