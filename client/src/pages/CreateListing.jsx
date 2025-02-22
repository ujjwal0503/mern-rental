import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
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
    offer: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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

    if (
      e.target.id === 'offer'
    ) {
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

    if (
      e.target.id === 'category' ||
      e.target.id === 'condition'
    ) {
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
      const res = await fetch('/api/listing/create', {
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
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        List Agricultural Equipment
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Equipment Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="5"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Location"
            className="border p-3 rounded-lg"
            id="location"
            required
            onChange={handleChange}
            value={formData.location}
          />

          {/* Category Dropdown */}
          <select
            className="border p-3 rounded-lg"
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

          {/* Checkboxes */}
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          {/* Condition Dropdown */}
          <select
            className="border p-3 rounded-lg"
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

          {/* Pricing Inputs */}
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="rentalPrice"
                min="50"
                max="100000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.rentalPrice}
              />
              <div className="flex flex-col items-center">
                <p>Rental Price</p>
                <span className="text-xs">(₹ / day)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Section */}
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex flex-wrap gap-6 justify-center">
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="100000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  <span className="text-xs">(₹ / Day)</span>
                </div>
              </div>
            )}
            {formData.type === "rent" && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="depositAmount"
                  min="500"
                  max="10000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.depositAmount}
                />
                <div className="flex flex-col items-center">
                  <p>Deposit Amount</p>
                  <span className="text-xs">(₹ refundable)</span>
                </div>
              </div>
            )}
          </div>

          {/* Image Upload Section */}
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                className="p-3 border border-gray-300 rounded w-full"
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                disabled={uploading}
                onClick={handleImageSubmit}
                className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between p-3 border items-center"
                >
                  <img
                    src={url}
                    alt="listing image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                  >
                    Delete
                  </button>
                </div>
            ))}
            <button
              disabled={loading || uploading}
              className="p-3 bg-green-500 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Creating..." : "Create listing"}
            </button>
            {error && <p className="text-red-700 text-sm">{error}</p>}
          </div>
        </div>
      </form>
    </main>
  );
}