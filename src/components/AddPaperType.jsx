
import React, { useState } from "react";

const AddPaperType = ({ onClose, onAdd }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setUploadedImageUrl(null); // Reset on new file selection
            setError("");
        }
    };

    const handleImageUpload = async () => {
        if (!selectedFile) {
            setError("Please select a file to upload.");
            return;
        }

        setIsUploading(true);
        setError("");

        const formData = new FormData();
        formData.append('image', selectedFile);

        const token = localStorage.getItem("token");

        try {
            const response = await fetch('https://love-unsent-app-final-backend.onrender.com/api/paper-types/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Image upload failed');
            }

            const data = await response.json();
            setUploadedImageUrl(data.url);
            alert("Image uploaded successfully! You can now save the paper type.");

        } catch (err) {
            console.error(err);
            setError(err.message || "Image upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name.trim() || !description.trim()) {
            setError("Name and description are required.");
            return;
        }

        if (!uploadedImageUrl) {
            setError("Please upload an image before saving.");
            return;
        }

        setIsLoading(true);
        const token = localStorage.getItem("token");

        try {
            const response = await fetch('https://love-unsent-app-final-backend.onrender.com/api/paper-types', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    image: uploadedImageUrl, // Backend expects 'image'
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save paper type');
            }

            onAdd(); // Notify parent to refresh
            onClose();

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg relative text-gray-800 shadow-xl">
                <h2 className="text-xl font-bold mb-4">Add New Paper Type</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="font-semibold block mb-1 text-sm">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Cotton Rag Paper"
                            required
                            className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="font-semibold block mb-1 text-sm">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            placeholder="A short description of the paper type..."
                            required
                            className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="font-semibold block mb-1 text-sm">Image</label>
                        <div className="flex items-start gap-4">
                            <div className="w-28 h-28 bg-gray-100 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-md" />
                                ) : (
                                    <span className="text-xs text-center text-gray-500">Preview</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <input
                                    type="file"
                                    id="imageUpload"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept="image/png, image/jpeg, image/webp"
                                />
                                <label htmlFor="imageUpload" className="cursor-pointer bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors inline-block text-sm">
                                    Choose File
                                </label>
                                {selectedFile && <p className="text-xs mt-2 text-gray-500 truncate">{selectedFile.name}</p>}

                                <button
                                    type="button"
                                    onClick={handleImageUpload}
                                    disabled={!selectedFile || isUploading || uploadedImageUrl}
                                    className="mt-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-all disabled:bg-blue-300 disabled:cursor-not-allowed w-full text-sm"
                                >
                                    {isUploading ? "Uploading..." : (uploadedImageUrl ? "Uploaded ✓" : "Upload Image")}
                                </button>
                            </div>
                        </div>
                    </div>

                    {error && <p className="text-red-600 font-semibold text-sm text-center">{error}</p>}

                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                        <button type="button" onClick={onClose} className="bg-gray-200 font-bold py-2 px-5 rounded-md text-gray-700 hover:bg-gray-300 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={isLoading || isUploading} className="bg-green-600 text-white font-bold py-2 px-5 rounded-md hover:bg-green-700 transition-colors disabled:bg-green-300">
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPaperType;
