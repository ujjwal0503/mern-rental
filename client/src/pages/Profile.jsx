import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  // New handleFileUpload function using backend endpoint
  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      setFilePerc(0); // Start progress
      const response = await fetch('/api/upload/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setFileUploadError(true);
        return;
      }

      setFilePerc(100); // Complete progress
      setFormData(prev => ({ ...prev, avatar: data.url }));
      setFileUploadError(false);
    } catch (error) {
      setFileUploadError(true);
      console.error('Error uploading file:', error);
    }
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    // Immediately clear any update success message
    setUpdateSuccess(false);
    
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Your Profile</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <div className="relative group">
              <img
                onClick={() => fileRef.current.click()}
                src={formData.avatar || currentUser.avatar}
                alt="profile"
                className="h-28 w-28 rounded-full object-cover cursor-pointer ring-4 ring-gray-100 transition duration-200 hover:ring-green-200"
              />
              <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer" onClick={() => fileRef.current.click()}>
                <span className="text-white text-sm font-medium">Change</span>
              </div>
            </div>
            
            {fileUploadError ? (
              <p className="mt-2 text-sm text-red-600">
                Error uploading image (must be less than 2MB)
              </p>
            ) : filePerc > 0 && filePerc < 100 ? (
              <p className="mt-2 text-sm text-green-600">
                Uploading: {filePerc}%
              </p>
            ) : filePerc === 100 ? (
              <p className="mt-2 text-sm text-green-600">
                Image successfully uploaded!
              </p>
            ) : null}
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                defaultValue={currentUser.username}
                id="username"
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                onChange={handleChange}
              />
            </div>
            
            <div>
              <input
                type="email"
                placeholder="Email"
                id="email"
                defaultValue={currentUser.email}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                onChange={handleChange}
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {updateSuccess && !userListings.length && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
              <p className="text-green-700 text-sm">Profile updated successfully!</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
            
            <Link 
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out text-center"
              to="/create-listing"
              onClick={() => setUpdateSuccess(false)}
            >
              Create New Listing
            </Link>
            
            <button 
              type="button"
              onClick={handleShowListings} 
              className="group relative w-full flex justify-center py-2 px-4 border border-green-600 text-sm font-medium rounded-lg text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
            >
              Show My Listings
            </button>
          </div>
        </form>
        
        <div className="flex justify-between items-center mt-8 pt-5 border-t border-gray-200">
          <button
            onClick={handleDeleteUser}
            className="text-red-600 hover:text-red-800 text-sm font-medium transition duration-150 ease-in-out"
          >
            Delete Account
          </button>
          <button 
            onClick={handleSignOut} 
            className="text-red-600 hover:text-red-800 text-sm font-medium transition duration-150 ease-in-out"
          >
            Sign Out
          </button>
        </div>

        {showListingsError && (
          <div className="mt-5 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <p className="text-red-700 text-sm">Error showing listings</p>
          </div>
        )}
        
        {userListings && userListings.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Your Listings</h2>
            <div className="space-y-4">
              {userListings.map((listing) => (
                <div
                  key={listing._id}
                  className="border border-gray-200 rounded-lg p-4 flex items-center gap-4 bg-white hover:shadow-md transition duration-150 ease-in-out"
                >
                  <Link to={`/listing/${listing._id}`} className="shrink-0">
                    <img
                      src={listing.imageUrls[0]}
                      alt="listing cover"
                      className="h-16 w-16 object-cover rounded-md"
                    />
                  </Link>
                  
                  <Link
                    className="flex-1 min-w-0"
                    to={`/listing/${listing._id}`}
                  >
                    <p className="text-slate-800 font-semibold truncate hover:text-green-600 transition duration-150 ease-in-out">
                      {listing.name}
                    </p>
                  </Link>
  
                  <div className="flex gap-3">
                    <Link 
                      to={`/update-listing/${listing._id}`}
                      className="text-green-600 hover:text-green-800 text-sm font-medium transition duration-150 ease-in-out py-1 px-3 rounded-md hover:bg-green-50"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleListingDelete(listing._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium transition duration-150 ease-in-out py-1 px-3 rounded-md hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}