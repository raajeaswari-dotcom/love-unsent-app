
import React, { useState, useEffect } from "react";
import AddPaperType from "./AddPaperType";
import EditPaperType from "./EditPaperType";
import AdminPaperTypesTable from "./AdminPaperTypesTable";

const AdminDashboard = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPaperType, setSelectedPaperType] = useState(null);
    const [tableKey, setTableKey] = useState(0); // Used to force re-render the table

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            // In a real app with a router, you would use navigate('/admin-login')
            // For this example, we'll use a simple redirect.
            window.location.href = '/admin-login'; 
        }
    }, []);

    const handleOpenEditModal = (paperType) => {
        setSelectedPaperType(paperType);
        setShowEditModal(true);
    };

    const refreshTable = () => {
        setTableKey(prevKey => prevKey + 1);
    };

    const handleAddSuccess = () => {
        setShowAddModal(false);
        refreshTable();
    };

    const handleUpdateSuccess = () => {
        setShowEditModal(false);
        setSelectedPaperType(null);
        refreshTable();
    };

    const handleDeleteSuccess = () => {
        refreshTable();
    };

    return (
        <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Paper Types Management</h1>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        + Add Paper Type
                    </button>
                </div>

                <AdminPaperTypesTable
                    keyProp={tableKey}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteSuccess}
                />
            </div>

            {showAddModal && (
                <AddPaperType
                    onClose={() => setShowAddModal(false)}
                    onAdd={handleAddSuccess}
                />
            )}

            {showEditModal && selectedPaperType && (
                <EditPaperType
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedPaperType(null);
                    }}
                    onUpdate={handleUpdateSuccess}
                    paperType={selectedPaperType}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
