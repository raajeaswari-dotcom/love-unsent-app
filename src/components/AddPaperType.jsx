
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

        const token = localStorage.getItem('adminToken');

        try {
            const response = await fetch('https://love-unsent-app-final-backend.onrender.com/api/paper-types/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Image upload failed');
            }

            const data = await response.json();
            setUploadedImageUrl(data.url);

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

        if (!uploadedImageUrl) {
            setError("Please upload an image first.");
            alert("Please upload an image first.");
            return;
        }

        setIsLoading(true);
        const token = localStorage.getItem('adminToken');

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
                    imageUrl: uploadedImageUrl,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save paper type');
            }

            // In a real app, you'd likely call a prop to refresh the list,
            // but we will just close as per the requirements.
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
            <div className="bg-[#F5EADF] rounded-2xl p-8 w-full max-w-lg relative text-[#5B2C23] shadow-2xl">
                <h2 className="text-2xl font-bold mb-6">Add New Paper Type</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="font-semibold block mb-1">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Cotton Rag Paper"
                            required
                            className="w-full bg-white/60 border border-[#8C6653] rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="font-semibold block mb-1">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            placeholder="A short description of the paper type..."
                            required
                            className="w-full bg-white/60 border border-[#8C6653] rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]"
                        />
                    </div>
                    <div>
                        <label className="font-semibold block mb-1">Image</label>
                        <div className="flex items-start gap-4">
                            <div className="w-32 h-32 bg-white/50 border-2 border-dashed border-[#8C6653] rounded-xl flex items-center justify-center">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                                ) : (
                                    <span className="text-xs text-center text-[#8C6653]">Image Preview</span>
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
                                <label htmlFor="imageUpload" className="cursor-pointer bg-[#E9CBA7] text-[#5B2C23] font-bold py-2 px-4 rounded-xl hover:bg-opacity-80 transition-colors inline-block">
                                    Choose File
                                </label>
                                {selectedFile && <p className="text-xs mt-2 text-[#8C6653] truncate">{selectedFile.name}</p>}

                                <button
                                    type="button"
                                    onClick={handleImageUpload}
                                    disabled={!selectedFile || isUploading || uploadedImageUrl}
                                    className="mt-2 bg-[#8C6653] text-white font-bold py-2 px-4 rounded-xl hover:bg-opacity-90 transition-all disabled:bg-opacity-50 disabled:cursor-not-allowed w-full"
                                >
                                    {isUploading ? "Uploading..." : (uploadedImageUrl ? "Uploaded ✓" : "Upload Image")}
                                </button>
                            </div>
                        </div>
                    </div>

                    {error && <p className="text-red-600 font-bold text-sm text-center">{error}</p>}

                    <div className="flex justify-end gap-4 pt-4 border-t border-[#E9CBA7]">
                        <button type="button" onClick={onClose} className="bg-gray-300 font-bold py-2 px-6 rounded-xl text-[#5B2C23] hover:bg-gray-400 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={isLoading} className="bg-[#5B2C23] text-white font-bold py-2 px-6 rounded-xl hover:bg-opacity-90 transition-colors disabled:bg-opacity-70">
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPaperType;