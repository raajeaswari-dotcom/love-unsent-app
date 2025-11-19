
import React, { useState, useEffect } from "react";

const AdminPaperTypesTable = ({ onEdit, onDelete, keyProp }) => {
    const [paperTypes, setPaperTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaperTypes = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('https://love-unsent-app-final-backend.onrender.com/api/paper-types');
                if (!response.ok) {
                    throw new Error('Failed to fetch paper types.');
                }
                const data = await response.json();
                setPaperTypes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaperTypes();
    }, [keyProp]); // Refetch when keyProp changes

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this paper type?")) {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`https://love-unsent-app-final-backend.onrender.com/api/paper-types/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to delete the paper type.');
                }
                onDelete(); // Notify parent to trigger a refresh
            } catch (err) {
                console.error("Delete error:", err);
                alert(err.message);
            }
        }
    };

    if (isLoading) return <div className="text-center p-8">Loading paper types...</div>;
    if (error) return <div className="text-center p-8 text-red-600">Error: {error}</div>;

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 w-24">Image</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Description</th>
                        <th scope="col" className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paperTypes.length > 0 ? paperTypes.map((paperType) => (
                        <tr key={paperType._id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">
                                <img src={paperType.image} alt={paperType.name} className="w-16 h-16 object-cover rounded-md" />
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900">{paperType.name}</td>
                            <td className="px-6 py-4">{paperType.description}</td>
                            <td className="px-6 py-4 text-right space-x-2">
                                <button
                                    onClick={() => onEdit(paperType)}
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(paperType._id)}
                                    className="font-medium text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="4" className="text-center py-8">No paper types found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPaperTypesTable;
