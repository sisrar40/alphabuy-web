import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchParks, updatePark } from "./parkSlice";
import Button from "../../components/ui/Button";
import { FaPlus, FaTrash, FaSave, FaImage, FaChevronDown, FaTimes } from "react-icons/fa";
import { useAlert } from "../../context/AlertContext";

const AdminImageManager = () => {
    const dispatch = useDispatch();
    const { items: parks, loading } = useSelector((state) => state.parks);
    const [selectedParkId, setSelectedParkId] = useState("");
    const [imageUrls, setImageUrls] = useState([]);
    const [newImageUrl, setNewImageUrl] = useState("");
    const [saving, setSaving] = useState(false);
    const { showAlert } = useAlert();

    useEffect(() => {
        if (!parks || parks.length === 0) {
            dispatch(fetchParks());
        }
    }, [dispatch, parks]);

    useEffect(() => {
        if (selectedParkId) {
            const park = parks.find((p) => p.id === selectedParkId);
            if (park) {
                setImageUrls(park.images || []);
            }
        } else {
            setImageUrls([]);
        }
    }, [selectedParkId, parks]);

    const handleAddImage = () => {
        if (newImageUrl.trim()) {
            setImageUrls([...imageUrls, newImageUrl.trim()]);
            setNewImageUrl("");
        }
    };

    const handleRemoveImage = (index) => {
        setImageUrls(imageUrls.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        if (!selectedParkId) return;

        setSaving(true);
        try {
            const park = parks.find((p) => p.id === selectedParkId);
            // Construct updated park object
            const updatedPark = {
                ...park,
                images: imageUrls
            };

            // Assume updatePark and the backend support this
            await dispatch(updatePark(updatedPark)).unwrap();
            showAlert("Images updated successfully!", "success");
        } catch (error) {
            console.error("Failed to update images:", error);
            showAlert("Failed to update images", "error");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Park Image Manager</h2>
                <p className="text-sm text-gray-500">Select a park to manage its gallery of images</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Selection & Input */}
                <div className="space-y-6">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                            Select Park
                        </label>
                        <select
                            value={selectedParkId}
                            onChange={(e) => setSelectedParkId(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">Choose a park...</option>
                            {parks?.map((park) => (
                                <option key={park.id} value={park.id}>
                                    {park.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={`${!selectedParkId ? 'opacity-50 pointer-events-none' : ''}`}>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                            Add New Image URL
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newImageUrl}
                                onChange={(e) => setNewImageUrl(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                            />
                            <button
                                onClick={handleAddImage}
                                disabled={!newImageUrl.trim()}
                                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-300 transition-all flex items-center gap-2"
                            >
                                <FaPlus /> Add
                            </button>
                        </div>
                    </div>

                    {selectedParkId && (
                        <div className="pt-6 border-t border-gray-100">
                            <Button
                                onClick={handleSave}
                                loading={saving}
                                className="w-full !py-4 shadow-lg shadow-blue-500/20"
                            >
                                <FaSave className="mr-2" />
                                Save Changes to Gallery
                            </Button>
                        </div>
                    )}
                </div>

                {/* Right Column - Preview & List */}
                <div className="bg-gray-50 rounded-2xl p-6 min-h-[400px]">
                    <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <FaImage className="text-blue-500" />
                        Current Gallery ({imageUrls.length})
                    </h3>

                    {!selectedParkId ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <FaImage className="text-4xl mb-2 opacity-20" />
                            <p className="text-sm">Select a park to view images</p>
                        </div>
                    ) : imageUrls.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <FaTimes className="text-4xl mb-2 opacity-20" />
                            <p className="text-sm">No images in gallery</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {imageUrls.map((url, index) => (
                                <div key={index} className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden flex items-center gap-4 p-3 pr-12 transition-all hover:border-blue-200 hover:shadow-md">
                                    <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                        <img
                                            src={url}
                                            alt={`Park ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/150?text=Invalid+URL";
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-400 truncate">URL {index + 1}</p>
                                        <p className="text-sm font-medium text-gray-900 truncate">{url}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                    >
                                        <FaTrash className="text-xs" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminImageManager;
