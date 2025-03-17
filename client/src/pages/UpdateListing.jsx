import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    location: '',
    category: '',
    type: 'rent',
    condition: '',
    rentalPrice: 50,
    discountPrice: 50,
    depositAmount: 500,
    offer: false
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      setFormData(data);
    };
    fetchListing();
  }, []);

  const storeImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Upload failed');
    }

    const data = await response.json();
    return data.url;
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setImageUploadError(false);

    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      try {
        const urls = await Promise.all(
          [...files].map((file) => storeImage(file))
        );
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
      } catch (error) {
        setImageUploadError('Error uploading images (max 2 MB per image)');
      }
    } else {
      setImageUploadError('You can only upload 6 images per listing');
    }
    setUploading(false);
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (e.target.id === 'offer') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }

    if (e.target.id === 'category' || e.target.id === 'condition') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.rentalPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  
  return (
    <main className="p-3 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-8 text-green-700">
        Update Agricultural Equipment
      </h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-5 flex-1">
            <h2 className="text-xl font-medium text-green-700 border-b pb-2">Equipment Details</h2>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Equipment Name</label>
              <input
                type="text"
                placeholder="Enter equipment name"
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                id="name"
                maxLength="62"
                minLength="5"
                required
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                placeholder="Describe your equipment"
                className="border p-3 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-green-500"
                id="description"
                required
                onChange={handleChange}
                value={formData.description}
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="location" className="text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                placeholder="Where is the equipment located?"
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                id="location"
                required
                onChange={handleChange}
                value={formData.location}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="category" className="text-sm font-medium text-gray-700">Equipment Category</label>
              <select
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                id="category"
                required
                onChange={handleChange}
                value={formData.category}
              >
                <option value="">Select Equipment Category</option>
                <option value="Tractor">Tractor</option>
                <option value="Harvester">Harvester</option>
                <option value="Plow">Plow</option>
                <option value="Seeder">Seeder</option>
                <option value="Irrigation System">Irrigation System</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="condition" className="text-sm font-medium text-gray-700">Equipment Condition</label>
              <select
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                id="condition"
                required
                onChange={handleChange}
                value={formData.condition}
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Average">Average</option>
                <option value="Needs Repair">Needs Repair</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Listing Type</label>
              <div className="flex gap-6 flex-wrap">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id="sale"
                    className="w-5 h-5 accent-green-500"
                    onChange={handleChange}
                    checked={formData.type === "sale"}
                  />
                  <span>Sell</span>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id="rent"
                    className="w-5 h-5 accent-green-500"
                    onChange={handleChange}
                    checked={formData.type === "rent"}
                  />
                  <span>Rent</span>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id="offer"
                    className="w-5 h-5 accent-green-500"
                    onChange={handleChange}
                    checked={formData.offer}
                  />
                  <span>Offer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5 flex-1">
            <h2 className="text-xl font-medium text-green-700 border-b pb-2">Pricing & Images</h2>
            
            {/* Pricing Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="rentalPrice" className="text-sm font-medium text-gray-700">Rental Price (₹/day)</label>
                <input
                  type="number"
                  id="rentalPrice"
                  min="50"
                  max="100000"
                  required
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={handleChange}
                  value={formData.rentalPrice}
                />
              </div>
              
              {formData.offer && (
                <div className="flex flex-col gap-1">
                  <label htmlFor="discountPrice" className="text-sm font-medium text-gray-700">Discounted Price (₹/day)</label>
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    max="100000"
                    required
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                </div>
              )}
              
              {formData.type === "rent" && (
                <div className="flex flex-col gap-1">
                  <label htmlFor="depositAmount" className="text-sm font-medium text-gray-700">Deposit Amount (₹ refundable)</label>
                  <input
                    type="number"
                    id="depositAmount"
                    min="500"
                    max="10000"
                    required
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    onChange={handleChange}
                    value={formData.depositAmount}
                  />
                </div>
              )}
            </div>

            {/* Image Upload Section */}
            <div className="flex flex-col gap-3 mt-2">
              <label className="font-medium text-gray-700">
                Images <span className="font-normal text-gray-500 text-sm">(First image will be the cover, max 6)</span>
              </label>
              
              <div className="flex gap-2">
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                />
                <button
                  type="button"
                  disabled={uploading}
                  onClick={handleImageSubmit}
                  className="p-3 text-green-700 border border-green-700 rounded-lg hover:bg-green-50 hover:shadow-md disabled:opacity-70 whitespace-nowrap"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
              
              {imageUploadError && (
                <p className="text-red-600 text-sm mt-1">{imageUploadError}</p>
              )}

              {/* Image Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {formData.imageUrls.length > 0 &&
                  formData.imageUrls.map((url, index) => (
                    <div
                      key={url}
                      className="flex justify-between p-3 border rounded-lg items-center bg-gray-50"
                    >
                      <img
                        src={url}
                        alt="listing image"
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="p-2 text-red-600 rounded-lg hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-auto pt-4">
              <button
                disabled={loading || uploading}
                className="w-full p-3 bg-green-600 text-white rounded-lg uppercase font-medium hover:bg-green-700 hover:shadow-md disabled:opacity-70 transition"
              >
                {loading ? "Updating..." : "Update Listing"}
              </button>
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}