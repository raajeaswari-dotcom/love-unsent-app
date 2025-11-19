
import React, { useState, useEffect } from "react";

const EditPaperType = ({ onClose, onUpdate, paperType }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (paperType) {
            setName(paperType.name || "");
            setDescription(paperType.description || "");
            setPreviewUrl(paperType.image || null);
        }
    }, [paperType]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setUploadedImageUrl(null);
            setError("");
        }
    };

    const handleImageUpload = async () => {
        if (!selectedFile) {
            setError("Please select a new file to upload.");
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
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });
            if (!response.ok) throw new Error('Image upload failed');
            const data = await response.json();
            setUploadedImageUrl(data.url);
             alert("Image uploaded successfully! You can now save the changes.");
        } catch (err) {
            console.error(err);
            setError("Image upload failed. Please try again.");
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

        setIsLoading(true);
        const token = localStorage.getItem("token");
        const imageToSend = uploadedImageUrl || paperType.image;

        try {
            const response = await fetch(`https://love-unsent-app-final-backend.onrender.com/api/paper-types/${paperType._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    image: imageToSend,
                }),
            });
            if (!response.ok) {
                 const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update paper type');
            }
            onUpdate();
            onClose();
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!paperType) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg relative text-gray-800 shadow-xl">
                <h2 className="text-xl font-bold mb-4">Edit Paper Type</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="edit-name" className="font-semibold block mb-1 text-sm">Name</label>
                        <input
                            id="edit-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="edit-description" className="font-semibold block mb-1 text-sm">Description</label>
                        <textarea
                            id="edit-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            required
                            className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="font-semibold block mb-1 text-sm">Image (Optional: change)</label>
                        <div className="flex items-start gap-4">
                            <div className="w-28 h-28 bg-gray-100 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Current" className="w-full h-full object-cover rounded-md" />
                                ) : (
                                    <span className="text-xs text-center text-gray-500">No Image</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <input
                                    type="file"
                                    id="editImageUpload"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept="image/png, image/jpeg, image/webp"
                                />
                                <label htmlFor="editImageUpload" className="cursor-pointer bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors inline-block text-sm">
                                    Choose New File
                                </label>
                                {selectedFile && <p className="text-xs mt-2 text-gray-500 truncate">{selectedFile.name}</p>}

                                <button
                                    type="button"
                                    onClick={handleImageUpload}
                                    disabled={!selectedFile || isUploading || uploadedImageUrl}
                                    className="mt-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-all disabled:bg-blue-300 disabled:cursor-not-allowed w-full text-sm"
                                >
                                     {isUploading ? "Uploading..." : (uploadedImageUrl ? "Uploaded ✓" : "Upload New Image")}
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
                            {isLoading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPaperType;
