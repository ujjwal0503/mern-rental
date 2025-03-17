import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    category: '',
    condition: '',
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const categoryFromUrl = urlParams.get('category');
    const conditionFromUrl = urlParams.get('condition');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      categoryFromUrl ||
      conditionFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        category: categoryFromUrl || '',
        condition: conditionFromUrl || '',
        offer: offerFromUrl === 'true',
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      try {
        setLoading(true);
        setShowMore(false);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setListings(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (e.target.id === 'offer') {
      setSidebardata({
        ...sidebardata,
        offer: e.target.checked,
      });
    }

    if (e.target.id === 'category' || e.target.id === 'condition') {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.value,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('category', sidebardata.category);
    urlParams.set('condition', sidebardata.condition);
    urlParams.set('offer', sidebardata.offer.toString());
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar Filter */}
      <div className="md:w-80 lg:w-96 p-6 bg-white shadow-md md:min-h-screen">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Filter Options</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">
              Search Term
            </label>
            <div className="relative">
              <input
                type="text"
                id="searchTerm"
                placeholder="Search equipment..."
                className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Type</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5 h-5 accent-green-600"
                  onChange={handleChange}
                  checked={sidebardata.type === "all"}
                />
                <span className="text-gray-700">Rent & Sale</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5 h-5 accent-green-600"
                  onChange={handleChange}
                  checked={sidebardata.type === "rent"}
                />
                <span className="text-gray-700">Rent</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5 h-5 accent-green-600"
                  onChange={handleChange}
                  checked={sidebardata.type === "sale"}
                />
                <span className="text-gray-700">Sale</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5 h-5 accent-green-600"
                  onChange={handleChange}
                  checked={sidebardata.offer}
                />
                <span className="text-gray-700">Offer</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Category</label>
            <select
              id="category"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              onChange={handleChange}
              value={sidebardata.category}
            >
              <option value="">All Categories</option>
              <option value="Tractor">Tractor</option>
              <option value="Harvester">Harvester</option>
              <option value="Plow">Plow</option>
              <option value="Seeder">Seeder</option>
              <option value="Irrigation System">Irrigation System</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Condition</label>
            <select
              id="condition"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              onChange={handleChange}
              value={sidebardata.condition}
            >
              <option value="">Any Condition</option>
              <option value="New">New</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Needs Repair">Needs Repair</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Sort By</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            >
              <option value="rentalPrice_desc">Price high to low</option>
              <option value="rentalPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button className="bg-green-600 text-white p-3 rounded-lg font-medium hover:bg-green-700 transition-colors mt-4 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Apply Filters
          </button>
        </form>
      </div>
      
      {/* Results Area */}
      <div className="flex-1">
        <div className="bg-white shadow-sm p-6 mb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Search Results
            {!loading && listings.length > 0 && (
              <span className="text-lg font-normal text-gray-500 ml-2">
                ({listings.length} items found)
              </span>
            )}
          </h1>
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}
        
        {/* No Results */}
        {!loading && listings.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl text-gray-600 font-medium">No listings found!</p>
            <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
          </div>
        )}
        
        {/* Results Grid */}
        {!loading && listings.length > 0 && (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
              {listings.map((listing) => (
                <div key={listing._id} className="flex justify-center">
                  <ListingItem listing={listing} />
                </div>
              ))}
            </div>
            
            {/* Show More Button */}
            {showMore && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={onShowMoreClick}
                  className="flex items-center gap-2 text-green-700 hover:text-green-800 font-medium bg-green-50 hover:bg-green-100 px-6 py-3 rounded-lg transition-colors"
                >
                  Load More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}